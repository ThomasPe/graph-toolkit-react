/**
 * MockProvider - simple in-memory provider for development and tests
 */

import { Presence, User } from '@microsoft/microsoft-graph-types';
import { IProvider, ProviderState } from './IProvider';
import {
  IPersonDataProvider,
  IPeopleSearchProvider,
  PeopleSearchResult,
  ProviderPersonDataRequest,
  ProviderPersonDataResponse,
} from './IPersonDataProvider';
import { MOCK_AVATAR_DATA_URL } from './mockAvatarData';

type StateListener = () => void;

/** Mock people roster used by {@link MockProvider.searchPeople} */
const MOCK_PEOPLE: PeopleSearchResult[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    displayName: 'Adele Vance',
    mail: 'adelev@contoso.com',
    userPrincipalName: 'adelev@contoso.com',
    jobTitle: 'Product Manager',
    department: 'Marketing',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    displayName: 'Alex Wilber',
    mail: 'alexw@contoso.com',
    userPrincipalName: 'alexw@contoso.com',
    jobTitle: 'Marketing Assistant',
    department: 'Marketing',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    displayName: 'Diego Siciliani',
    mail: 'diegosi@contoso.com',
    userPrincipalName: 'diegosi@contoso.com',
    jobTitle: 'HR Manager',
    department: 'Human Resources',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    displayName: 'Grady Archie',
    mail: 'gradya@contoso.com',
    userPrincipalName: 'gradya@contoso.com',
    jobTitle: 'Accountant',
    department: 'Finance',
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    displayName: 'Henrietta Mueller',
    mail: 'henriettam@contoso.com',
    userPrincipalName: 'henriettam@contoso.com',
    jobTitle: 'Graphic Designer',
    department: 'Creative',
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    displayName: 'Isaiah Langer',
    mail: 'isaiahl@contoso.com',
    userPrincipalName: 'isaiahl@contoso.com',
    jobTitle: 'Sales Rep',
    department: 'Sales',
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    displayName: 'Johanna Lorenz',
    mail: 'johannal@contoso.com',
    userPrincipalName: 'johannal@contoso.com',
    jobTitle: 'Research Lead',
    department: 'R&D',
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    displayName: 'Joni Sherman',
    mail: 'jonis@contoso.com',
    userPrincipalName: 'jonis@contoso.com',
    jobTitle: 'Paralegal',
    department: 'Legal',
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    displayName: 'Lee Gu',
    mail: 'leeg@contoso.com',
    userPrincipalName: 'leeg@contoso.com',
    jobTitle: 'Director',
    department: 'Engineering',
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    displayName: 'Megan Bowen',
    mail: 'meganb@contoso.com',
    userPrincipalName: 'meganb@contoso.com',
    jobTitle: 'Marketing Manager',
    department: 'Marketing',
  },
].map((person) => ({
  ...person,
  photoUrl: MOCK_AVATAR_DATA_URL,
}));

export class MockProvider implements IProvider, IPersonDataProvider, IPeopleSearchProvider {
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
    const lookupIdentifier = request.identifier?.trim().toLowerCase();
    const matchedPerson = lookupIdentifier && lookupIdentifier !== 'me'
      ? MOCK_PEOPLE.find((person) =>
        person.id.toLowerCase() === lookupIdentifier ||
        person.mail?.toLowerCase() === lookupIdentifier ||
        person.userPrincipalName?.toLowerCase() === lookupIdentifier ||
        person.displayName?.toLowerCase() === lookupIdentifier
      )
      : MOCK_PEOPLE[0];
    const mockPerson = matchedPerson ?? MOCK_PEOPLE[0];
    const resolvedUserPrincipalName =
      matchedPerson || !request.identifier || request.identifier === 'me'
        ? mockPerson.userPrincipalName
        : request.identifier;

    const mockUser: User = {
      id: mockPerson.id,
      displayName: mockPerson.displayName,
      userPrincipalName: resolvedUserPrincipalName,
      jobTitle: mockPerson.jobTitle,
      department: mockPerson.department,
      officeLocation: '19/3106',
      mail: mockPerson.mail,
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

  async searchPeople(query: string, maxResults = 10): Promise<PeopleSearchResult[]> {
    const trimmed = query.trim();
    if (!trimmed) {
      return MOCK_PEOPLE.slice(0, maxResults);
    }

    const lower = trimmed.toLowerCase();
    return MOCK_PEOPLE.filter(
      (p) =>
        p.displayName?.toLowerCase().includes(lower) ||
        p.mail?.toLowerCase().includes(lower) ||
        p.userPrincipalName?.toLowerCase().includes(lower)
    ).slice(0, maxResults);
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
