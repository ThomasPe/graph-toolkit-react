import { describe, expect, it } from 'vitest';
import { clearPersonCache, getPersonCacheGeneration, getPersonCacheKey } from '../utils/personCache';

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
