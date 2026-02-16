/**
 * Person component types
 */

import type { PersonaProps } from '@fluentui/react-components';

export type PersonView = 'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines';

export interface PersonDetails {
  displayName?: string;
  mail?: string;
  jobTitle?: string;
  department?: string;
  officeLocation?: string;
  id?: string;
  userPrincipalName?: string;
}

export interface PersonProps extends PersonaProps {
  // Identity (provide one)
  userId?: string;
  userPrincipalName?: string;
  email?: string;

  // Direct data (skips fetch)
  personDetails?: PersonDetails;

  // Display options
  view?: PersonView;
  showPresence?: boolean;

  // Fetching options
  fetchImage?: boolean;
}
