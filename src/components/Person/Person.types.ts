/**
 * Person component types
 */

import type { CSSProperties } from 'react';
import { User } from '@microsoft/microsoft-graph-types';

export type PersonView = 'avatar' | 'oneline' | 'twolines' | 'threelines';
export type PersonSize = 'small' | 'medium' | 'large' | 'extra-large';
export type PersonTextAlignment = 'start' | 'center';
export type PersonTextPosition = 'before' | 'after' | 'below';

export interface PersonDetails {
  displayName?: string;
  mail?: string;
  jobTitle?: string;
  department?: string;
  officeLocation?: string;
  id?: string;
  userPrincipalName?: string;
}

export interface PersonProps {
  // Identity (provide one)
  userId?: string;
  userPrincipalName?: string;
  email?: string;

  // Direct data (skips fetch)
  personDetails?: PersonDetails;

  // Display options
  view?: PersonView;
  showPresence?: boolean;
  avatarSize?: PersonSize;

  // Persona layout options
  textAlignment?: PersonTextAlignment;
  textPosition?: PersonTextPosition;
  numericSize?: number;

  // Fetching options
  fetchImage?: boolean;

  // Interaction
  onClick?: (person: User) => void;

  // Styling
  className?: string;
  style?: CSSProperties;
}
