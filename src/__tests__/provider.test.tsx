import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { GraphProvider, useProvider, useProviderState } from '../providers/ProviderContext';
import { MockProvider } from '../providers/MockProvider';

describe('ProviderContext', () => {
  it('exposes provider and state transitions', async () => {
    const mock = new MockProvider();

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <GraphProvider provider={mock}>{children}</GraphProvider>
    );

    const { result: providerResult } = renderHook(() => useProvider(), { wrapper });
    const { result: stateResult } = renderHook(() => useProviderState(), { wrapper });

    expect(providerResult.current).toBe(mock);
    expect(stateResult.current).toBe('SignedOut');

    await act(async () => {
      await mock.login();
    });

    expect(stateResult.current).toBe('SignedIn');

    await act(async () => {
      await mock.logout();
    });
    expect(stateResult.current).toBe('SignedOut');
  });
});
