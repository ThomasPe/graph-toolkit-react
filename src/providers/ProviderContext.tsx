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
  useRef,
  useSyncExternalStore,
} from 'react';
import { IProvider, ProviderState } from './IProvider';
import { clearPersonCache, DEFAULT_PERSON_CACHE_OPTIONS, PersonCacheOptions } from '../utils/personCache';

interface GraphProviderContextValue {
  provider: IProvider | null;
  state: ProviderState;
  personCacheOptions: PersonCacheOptions;
}

const GraphProviderContext = createContext<GraphProviderContextValue>({
  provider: null,
  state: 'Loading',
  personCacheOptions: DEFAULT_PERSON_CACHE_OPTIONS,
});

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

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      provider.onStateChanged?.(onStoreChange);

      return () => {
        const removableProvider = provider as IProvider & {
          removeStateChangedHandler?: (handler: () => void) => void;
        };
        if (typeof removableProvider.removeStateChangedHandler === 'function') {
          removableProvider.removeStateChangedHandler(onStoreChange);
        }
      };
    },
    [provider]
  );

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // Remove persisted person data when the user signs out so the next account
  // on this browser cannot read it.
  const previousSession = useRef<{ provider: IProvider; state: ProviderState } | null>(null);
  useEffect(() => {
    const previous = previousSession.current;
    previousSession.current = { provider, state };

    if (previous?.provider === provider && previous.state === 'SignedIn' && state === 'SignedOut') {
      void clearPersonCache();
    }
  }, [provider, state]);

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
      personCacheOptions: resolvedPersonCacheOptions,
    }),
    [provider, state, resolvedPersonCacheOptions]
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
 * Hook to access configured person cache options
 */
export const usePersonCacheOptions = (): PersonCacheOptions => {
  const { personCacheOptions } = useContext(GraphProviderContext);
  return personCacheOptions;
};
