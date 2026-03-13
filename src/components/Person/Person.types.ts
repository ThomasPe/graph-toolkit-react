/**
 * Person component types
 */

import type { PersonaProps } from '@fluentui/react-components';
import type { ReactElement } from 'react';

export type PersonView = 'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines';

/**
 * Normalized details about a person used by the {@link Person} component.
 *
 * This interface typically comes from Microsoft Graph or an application-specific user store
 * and is used as the backing data for line mappings and custom renderers.
 */
export interface PersonDetails {
  /**
   * The person's display name.
   */
  displayName?: string | null;
  /**
   * The person's primary mail address (as returned by some Microsoft Graph shapes).
   */
  mail?: string | null;
  /**
   * The person's job title.
   */
  jobTitle?: string | null;
  /**
   * The department the person belongs to.
   */
  department?: string | null;
  /**
   * The person's office location.
   */
  officeLocation?: string | null;
  /**
   * The unique identifier for the person.
   */
  id?: string | null;
  /**
   * The person's user principal name (UPN).
   */
  userPrincipalName?: string | null;
  /**
   * The person's email address (alias for some data sources).
   */
  email?: string | null;
  /**
   * Current presence activity (for example, "InAMeeting" or "Presenting"), when available.
   */
  presenceActivity?: string | null;
  /**
   * Current presence availability (for example, "Available", "Busy", "Away"), when available.
   */
  presenceAvailability?: string | null;
  /**
   * Additional custom fields for the person.
   *
   * These fields can also be referenced from `lineXProperty` mappings when supported by the implementation.
   */
  [key: string]: unknown;
}

/**
 * Context passed to a {@link PersonLineRenderer} when rendering a line of text.
 */
export interface PersonLineRenderContext {
  /**
   * The logical line number being rendered (1–4).
   */
  line: 1 | 2 | 3 | 4;
  /**
   * The resolved person details used for this line.
   */
  person: PersonDetails;
  /**
   * The default text that would be rendered for this line based on the `lineXProperty` mapping,
   * if any. This can be used as a fallback or starting point when customizing rendering.
   */
  text?: string;
}

/**
 * Function used to customize rendering of a single line of person information.
 *
 * The renderer can either return a `ReactElement` for full control over layout and styling,
 * a plain `string` to be rendered as simple text, or `null` to suppress rendering of the line.
 *
 * @param context - Information about the line being rendered and its resolved data.
 * @returns A React element, plain string, or `null` to skip the line.
 */
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

  /**
   * Mapping for the first text line.
   *
   * This is the name of a field on {@link PersonDetails} (for example, `"displayName"`), or a
   * comma-separated list of field names to use as fallbacks in order (for example,
   * `"displayName,mail,email"`).
   *
   * Implementations may also support pseudo-fields for derived values such as presence in
   * addition to literal `PersonDetails` keys.
   */
  line1Property?: string;
  /**
   * Mapping for the second text line.
   *
   * Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
   * to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.
   */
  line2Property?: string;
  /**
   * Mapping for the third text line.
   *
   * Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
   * to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.
   */
  line3Property?: string;
  /**
   * Mapping for the fourth text line.
   *
   * Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
   * to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.
   */
  line4Property?: string;

  /**
   * Custom renderer for the first text line.
   *
   * When provided, this overrides the default rendering for line 1 and is called with a
   * {@link PersonLineRenderContext}. The `text` property in the context contains the value that
   * would have been shown based on `line1Property`, if any.
   */
  renderLine1?: PersonLineRenderer;
  /**
   * Custom renderer for the second text line.
   *
   * When provided, this overrides the default rendering for line 2 and is called with a
   * {@link PersonLineRenderContext}. The `text` property in the context contains the value that
   * would have been shown based on `line2Property`, if any.
   */
  renderLine2?: PersonLineRenderer;
  /**
   * Custom renderer for the third text line.
   *
   * When provided, this overrides the default rendering for line 3 and is called with a
   * {@link PersonLineRenderContext}. The `text` property in the context contains the value that
   * would have been shown based on `line3Property`, if any.
   */
  renderLine3?: PersonLineRenderer;
  /**
   * Custom renderer for the fourth text line.
   *
   * When provided, this overrides the default rendering for line 4 and is called with a
   * {@link PersonLineRenderContext}. The `text` property in the context contains the value that
   * would have been shown based on `line4Property`, if any.
   */
  renderLine4?: PersonLineRenderer;

  // Fetching options
  fetchImage?: boolean;
}
