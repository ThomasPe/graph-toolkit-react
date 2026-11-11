import { Presence, User } from '@microsoft/microsoft-graph-types';

const PERSON_CACHE_DB_NAME = 'graph-toolkit-person-cache';
const PERSON_CACHE_STORE_NAME = 'personData';
// Version 2 scopes cache keys by account. Entries written by version 1 are dropped on upgrade.
const PERSON_CACHE_DB_VERSION = 2;

export const USER_CACHE_TTL_MS = 60 * 60 * 1000;
export const PHOTO_CACHE_TTL_MS = 60 * 60 * 1000;
export const PRESENCE_CACHE_TTL_MS = 5 * 60 * 1000;

export interface PersonCacheOptions {
  enabled: boolean;
  userTtlMs: number;
  photoTtlMs: number;
  presenceTtlMs: number;
}

export const DEFAULT_PERSON_CACHE_OPTIONS: PersonCacheOptions = {
  enabled: true,
  userTtlMs: USER_CACHE_TTL_MS,
  photoTtlMs: PHOTO_CACHE_TTL_MS,
  presenceTtlMs: PRESENCE_CACHE_TTL_MS,
};

export interface PersonCacheEntry {
  user?: User | null;
  userCachedAt?: number;
  presence?: Presence | null;
  presenceCachedAt?: number;
  photoUrl?: string | null;
  photoCachedAt?: number;
}

const isIndexedDbAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
};

const requestToPromise = <T>(request: IDBRequest<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const openPersonCacheDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!isIndexedDbAvailable()) {
      reject(new Error('IndexedDB unavailable'));
      return;
    }

    const request = window.indexedDB.open(PERSON_CACHE_DB_NAME, PERSON_CACHE_DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      // Drop entries from older versions: their keys were not scoped to an account
      if (db.objectStoreNames.contains(PERSON_CACHE_STORE_NAME)) {
        db.deleteObjectStore(PERSON_CACHE_STORE_NAME);
      }
      db.createObjectStore(PERSON_CACHE_STORE_NAME);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const CURRENT_USER_IDENTIFIER = 'me';

/**
 * Build the cache key for a person, scoped to the signed-in account when known.
 *
 * Returns `null` when the entry must not be persisted: `me` resolves to a different
 * person for every account, so it is only cacheable when the account is known.
 *
 * @param identifier - User ID, UPN, mail or `me`
 * @param accountId - Stable identifier of the signed-in account, if the provider exposes one
 * @returns The cache key, or `null` when the entry must not be cached
 */
export const getPersonCacheKey = (identifier: string, accountId?: string | null): string | null => {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedAccountId = accountId?.trim().toLowerCase();

  if (!normalizedAccountId) {
    return normalizedIdentifier === CURRENT_USER_IDENTIFIER ? null : `person::${normalizedIdentifier}`;
  }

  return `person:${encodeURIComponent(normalizedAccountId)}:${normalizedIdentifier}`;
};

export const isTimestampFresh = (timestamp: number | undefined, ttlMs: number): boolean => {
  if (!timestamp) {
    return false;
  }
  return Date.now() - timestamp < ttlMs;
};

export const readPersonCache = async (key: string): Promise<PersonCacheEntry | null> => {
  if (!isIndexedDbAvailable()) {
    return null;
  }

  let db: IDBDatabase | null = null;

  try {
    db = await openPersonCacheDb();
    const transaction = db.transaction(PERSON_CACHE_STORE_NAME, 'readonly');
    const store = transaction.objectStore(PERSON_CACHE_STORE_NAME);
    const result = await requestToPromise(store.get(key));
    return (result as PersonCacheEntry | undefined) ?? null;
  } catch {
    return null;
  } finally {
    db?.close();
  }
};

export const writePersonCache = async (key: string, value: PersonCacheEntry): Promise<void> => {
  if (!isIndexedDbAvailable()) {
    return;
  }

  let db: IDBDatabase | null = null;

  try {
    db = await openPersonCacheDb();
    const transaction = db.transaction(PERSON_CACHE_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(PERSON_CACHE_STORE_NAME);
    await requestToPromise(store.put(value, key));
  } catch {
    return;
  } finally {
    db?.close();
  }
};

/**
 * Remove all cached person data, for example when the user signs out.
 */
export const clearPersonCache = async (): Promise<void> => {
  if (!isIndexedDbAvailable()) {
    return;
  }

  let db: IDBDatabase | null = null;

  try {
    db = await openPersonCacheDb();
    const transaction = db.transaction(PERSON_CACHE_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(PERSON_CACHE_STORE_NAME);
    await requestToPromise(store.clear());
  } catch {
    return;
  } finally {
    db?.close();
  }
};
