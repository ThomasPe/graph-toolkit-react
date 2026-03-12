/**
 * Person component types
 */

import type { PersonaProps } from '@fluentui/react-components';
import type { ReactElement } from 'react';

export type PersonView = 'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines';

export interface PersonDetails {
  displayName?: string | null;
  mail?: string | null;
  jobTitle?: string | null;
  department?: string | null;
  officeLocation?: string | null;
  id?: string | null;
  userPrincipalName?: string | null;
  email?: string | null;
  presenceActivity?: string | null;
  presenceAvailability?: string | null;
  [key: string]: unknown;
}

export interface PersonLineRenderContext {
  line: 1 | 2 | 3 | 4;
  person: PersonDetails;
  text?: string;
}

export type PersonLineRenderer = (context: PersonLineRenderContext) => ReactElement | string | null;

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

  // MGT-style line mapping
  line1Property?: string;
  line2Property?: string;
  line3Property?: string;
  line4Property?: string;

  // React replacement for MGT line templates
  renderLine1?: PersonLineRenderer;
  renderLine2?: PersonLineRenderer;
  renderLine3?: PersonLineRenderer;
  renderLine4?: PersonLineRenderer;

  // Fetching options
  fetchImage?: boolean;
}
