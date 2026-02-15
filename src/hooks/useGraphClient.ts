/**
 * Hook to access Graph Client
 */

import { useMemo } from 'react';
import { Client } from '@microsoft/microsoft-graph-client';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import { createGraphClient } from '../utils/graph';

/**
 * Hook to get a configured Graph Client instance
 */
export const useGraphClient = (): Client | null => {
  const provider = useProvider();
  const state = useProviderState();

  return useMemo(() => {
    if (!provider) return null;
    if (state !== 'SignedIn') return null;
    return createGraphClient(provider);
  }, [provider, state]);
};
