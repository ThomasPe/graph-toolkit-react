/**
 * React Context for Graph Provider
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { IProvider, ProviderState } from './IProvider';
import { clearPersonCache, DEFAULT_PERSON_CACHE_OPTIONS, PersonCacheOptions } from '../utils/personCache';

interface GraphProviderContextValue {
  provider: IProvider | null;
  state: ProviderState;
  accountId: string | null;
  personCacheOptions: PersonCacheOptions;
}

const GraphProviderContext = createContext<GraphProviderContextValue>({
  provider: null,
  state: 'Loading',
  accountId: null,
  personCacheOptions: DEFAULT_PERSON_CACHE_OPTIONS,
});

/**
 * Subscribe to provider change notifications.
 *
 * @param provider - The provider to observe
 * @param handler - Called whenever the provider reports a change
 * @returns A function that removes the handler when the provider supports removal
 */
const subscribeToProvider = (provider: IProvider, handler: () => void): (() => void) => {
  provider?.onStateChanged?.(handler);

  return () => {
    const removableProvider = provider as IProvider & {
      removeStateChangedHandler?: (handler: () => void) => void;
    };
    if (typeof removableProvider?.removeStateChangedHandler === 'function') {
      removableProvider.removeStateChangedHandler(handler);
    }
  };
};

export interface GraphProviderProps {
  provider: IProvider;
  children: ReactNode;
  personCacheOptions?: Partial<PersonCacheOptions>;
}

export const GraphProvider: React.FC<GraphProviderProps> = ({
  provider,
  children,
  personCacheOptions,
}) => {
  const getSnapshot = useCallback(
    () => provider?.getState?.() ?? 'Loading',
    [provider]
  );

  const getAccountIdSnapshot = useCallback(
    () => provider?.getAccountId?.() ?? null,
    [provider]
  );

  const subscribe = useCallback(
    (onStoreChange: () => void) => subscribeToProvider(provider, onStoreChange),
    [provider]
  );

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const accountId = useSyncExternalStore(subscribe, getAccountIdSnapshot, getAccountIdSnapshot);

  // Remove persisted person data when the user signs out so the next account on this
  // browser cannot read it. The provider is observed directly, not through rendered
  // state, so a sign-out followed by an immediate sign-in is not missed.
  useEffect(() => {
    let lastState = provider?.getState?.();

    return subscribeToProvider(provider, () => {
      const nextState = provider?.getState?.();

      if (lastState === 'SignedIn' && nextState === 'SignedOut') {
        void clearPersonCache();
      }

      lastState = nextState;
    });
  }, [provider]);

  const resolvedPersonCacheOptions = useMemo<PersonCacheOptions>(
    () => ({
      ...DEFAULT_PERSON_CACHE_OPTIONS,
      ...(personCacheOptions ?? {}),
    }),
    [personCacheOptions]
  );

  const value = useMemo<GraphProviderContextValue>(
    () => ({
      provider,
      state,
      accountId,
      personCacheOptions: resolvedPersonCacheOptions,
    }),
    [provider, state, accountId, resolvedPersonCacheOptions]
  );

  return <GraphProviderContext.Provider value={value}>{children}</GraphProviderContext.Provider>;
};

/**
 * Hook to access the current Graph provider
 */
export const useProvider = (): IProvider | null => {
  const { provider } = useContext(GraphProviderContext);
  return provider;
};

/**
 * Hook to access the current provider state
 */
export const useProviderState = (): ProviderState => {
  const { state } = useContext(GraphProviderContext);
  return state;
};

/**
 * Hook to access the signed-in account identifier reported by the provider.
 *
 * Returns `null` when the provider does not implement `getAccountId()` or nobody is signed in.
 */
export const useProviderAccountId = (): string | null => {
  const { accountId } = useContext(GraphProviderContext);
  return accountId;
};

/**
 * Hook to access configured person cache options
 */
export const usePersonCacheOptions = (): PersonCacheOptions => {
  const { personCacheOptions } = useContext(GraphProviderContext);
  return personCacheOptions;
};
