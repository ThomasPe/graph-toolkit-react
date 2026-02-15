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

interface GraphProviderContextValue {
  provider: IProvider | null;
  state: ProviderState;
}

const GraphProviderContext = createContext<GraphProviderContextValue>({
  provider: null,
  state: ProviderState.Loading,
});

export interface GraphProviderProps {
  provider: IProvider;
  children: ReactNode;
}

export const GraphProvider: React.FC<GraphProviderProps> = ({ provider, children }) => {
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

  const value = useMemo<GraphProviderContextValue>(() => ({ provider, state }), [provider, state]);

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
