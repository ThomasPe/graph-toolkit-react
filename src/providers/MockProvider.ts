/**
 * MockProvider - simple in-memory provider for development and tests
 */

import { Presence, User } from '@microsoft/microsoft-graph-types';
import { IProvider, ProviderState } from './IProvider';
import {
  IPersonDataProvider,
  ProviderPersonDataRequest,
  ProviderPersonDataResponse,
} from './IPersonDataProvider';
import { MOCK_AVATAR_DATA_URL } from './mockAvatarData';

type StateListener = () => void;

export class MockProvider implements IProvider, IPersonDataProvider {
  private state: ProviderState = 'SignedOut';
  private listeners: StateListener[] = [];
  constructor(options?: { autoSignIn?: boolean; mockUserId?: string }) {
    if (options?.autoSignIn) {
      this.state = 'SignedIn';
    }
  }

  getAccessToken(): Promise<string> {
    if (this.state !== 'SignedIn') {
      return Promise.reject(new Error('Not signed in'));
    }
    // Return a dummy token string; callers should only use this in mock graph flows
    return Promise.resolve('mock-token');
  }

  async getPersonData(request: ProviderPersonDataRequest): Promise<ProviderPersonDataResponse> {
    const mockDisplayName = 'Adele Vance';
    const mockUserPrincipalName =
      request.identifier && request.identifier !== 'me'
        ? request.identifier
        : 'adelev@contoso.com';

    const mockUser: User = {
      id: '00000000-0000-0000-0000-000000000000',
      displayName: mockDisplayName,
      userPrincipalName: mockUserPrincipalName,
      jobTitle: 'Product Manager',
      department: 'Marketing',
      officeLocation: '19/3106',
      mail: 'adelev@contoso.com',
    } as User;

    const mockPresence: Presence = {
      availability: 'Available',
      activity: 'Available',
      id: mockUser.id!,
      odataType: '#microsoft.graph.presence',
    } as unknown as Presence;

    return {
      user: mockUser,
      presence: request.fetchPresence ? mockPresence : null,
      photoUrl: request.fetchPhoto ? MOCK_AVATAR_DATA_URL : null,
    };
  }

  async login(): Promise<void> {
    this.state = 'SignedIn';
    this.emit();
  }

  async logout(): Promise<void> {
    this.state = 'SignedOut';
    this.emit();
  }

  getState(): ProviderState {
    return this.state;
  }

  onStateChanged(handler: () => void): void {
    this.listeners.push(handler);
  }

  removeStateChangedHandler(handler: () => void): void {
    this.listeners = this.listeners.filter((h) => h !== handler);
  }

  private emit() {
    for (const l of this.listeners) {
      try {
        l();
      } catch {
        // swallow listener errors
      }
    }
  }
}

export const createMockSignedInProvider = () => new MockProvider({ autoSignIn: true });
