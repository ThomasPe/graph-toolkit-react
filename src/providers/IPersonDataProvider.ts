import { Presence, User } from '@microsoft/microsoft-graph-types';
import { IProvider } from './IProvider';

export interface ProviderPersonDataRequest {
  identifier?: string;
  fetchPresence: boolean;
  fetchPhoto: boolean;
}

export interface ProviderPersonDataResponse {
  user: User | null;
  presence: Presence | null;
  photoUrl: string | null;
}

export interface IPersonDataProvider {
  getPersonData(request: ProviderPersonDataRequest): Promise<ProviderPersonDataResponse>;
}

export const isPersonDataProvider = (
  provider: IProvider | null
): provider is IProvider & IPersonDataProvider => {
  return (
    typeof provider === 'object' &&
    provider !== null &&
    typeof (provider as Partial<IPersonDataProvider>).getPersonData === 'function'
  );
};
