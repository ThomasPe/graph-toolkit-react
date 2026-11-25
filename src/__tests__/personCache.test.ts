import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  clearPersonCache,
  getPersonCacheGeneration,
  getPersonCacheKey,
  writePersonCache,
} from '../utils/personCache';

describe('getPersonCacheKey', () => {
  it('scopes keys to the signed-in account', () => {
    const keyForAccountA = getPersonCacheKey('me', 'account-a');
    const keyForAccountB = getPersonCacheKey('me', 'account-b');

    expect(keyForAccountA).not.toBeNull();
    expect(keyForAccountA).not.toBe(keyForAccountB);
  });

  it('normalizes identifier casing and surrounding whitespace', () => {
    expect(getPersonCacheKey('  AdeleV@Contoso.com ', ' account-a ')).toBe(
      getPersonCacheKey('adelev@contoso.com', 'account-a')
    );
  });

  it('treats account IDs as case-sensitive', () => {
    expect(getPersonCacheKey('me', 'Account-A')).not.toBe(getPersonCacheKey('me', 'account-a'));
  });

  it('does not cache the current user when the account is unknown', () => {
    expect(getPersonCacheKey('me')).toBeNull();
    expect(getPersonCacheKey(' ME ', null)).toBeNull();
    expect(getPersonCacheKey('me', '  ')).toBeNull();
  });

  it('still caches other users when the account is unknown', () => {
    expect(getPersonCacheKey('adelev@contoso.com')).toBe('person::adelev@contoso.com');
  });

  it('cannot collide across the account/identifier boundary', () => {
    expect(getPersonCacheKey('b:c', 'a')).not.toBe(getPersonCacheKey('c', 'a:b'));
    expect(getPersonCacheKey('a:b')).not.toBe(getPersonCacheKey('b', 'a'));
  });
});

describe('clearPersonCache', () => {
  it('advances the cache generation so in-flight loads can detect the clear', async () => {
    const before = getPersonCacheGeneration();

    const clearing = clearPersonCache();
    expect(getPersonCacheGeneration()).toBe(before + 1);

    await clearing;
    expect(getPersonCacheGeneration()).toBe(before + 1);
  });
});

describe('writePersonCache', () => {
  /**
   * Minimal IndexedDB stand-in: `open()` succeeds on a later task, and store requests
   * succeed on a microtask, which is enough to interleave a write with a clear.
   */
  const installFakeIndexedDb = () => {
    const put = vi.fn();
    const clear = vi.fn();
    const succeedLater = <T extends { onsuccess: (() => void) | null }>(request: T, later: (run: () => void) => void): T => {
      later(() => request.onsuccess?.());
      return request;
    };
    const store = {
      put: (...args: unknown[]) => {
        put(...args);
        return succeedLater({ onsuccess: null, onerror: null, result: undefined }, queueMicrotask);
      },
      clear: () => {
        clear();
        return succeedLater({ onsuccess: null, onerror: null, result: undefined }, queueMicrotask);
      },
    };
    const db = { transaction: () => ({ objectStore: () => store }), close: vi.fn() };

    vi.stubGlobal('indexedDB', {
      open: () =>
        succeedLater(
          { onsuccess: null, onerror: null, onupgradeneeded: null, result: db },
          (run) => setTimeout(run, 0)
        ),
    });

    return { put, clear };
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('writes when the cache has not been cleared since the data was loaded', async () => {
    const { put } = installFakeIndexedDb();

    await writePersonCache('person::user-1', { user: { id: 'user-1' } }, getPersonCacheGeneration());

    expect(put).toHaveBeenCalledTimes(1);
  });

  it('drops a write when the cache is cleared while the database is still opening', async () => {
    const { put, clear } = installFakeIndexedDb();

    const writing = writePersonCache('person::user-1', { user: { id: 'user-1' } }, getPersonCacheGeneration());
    const clearing = clearPersonCache();
    await Promise.all([writing, clearing]);

    expect(clear).toHaveBeenCalledTimes(1);
    expect(put).not.toHaveBeenCalled();
  });
});
