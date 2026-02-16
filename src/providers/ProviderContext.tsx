/**
 * React Context for Graph Provider
 */

import React, {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { IProvider, ProviderState } from './IProvider';
import { DEFAULT_PERSON_CACHE_OPTIONS, PersonCacheOptions } from '../utils/personCache';

interface GraphProviderContextValue {
  provider: IProvider | null;
  state: ProviderState;
  personCacheOptions: PersonCacheOptions;
}

const GraphProviderContext = createContext<GraphProviderContextValue>({
  provider: null,
  state: ProviderState.Loading,
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
    () => provider?.getState?.() ?? ProviderState.Loading,
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
