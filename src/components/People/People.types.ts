/**
 * People component types
 */

import type { AvatarGroupProps } from '@fluentui/react-components';
import type { PeopleSearchResult } from '../../providers/IPersonDataProvider';
import type { PersonDetails } from '../Person/Person.types';

/**
 * Supported built-in sort fields for resolved people collections.
 */
export type PeopleSortField = 'displayName' | 'givenName' | 'surname';

/**
 * Sort direction for resolved people collections.
 */
export type PeopleSortDirection = 'asc' | 'desc';

/**
 * Triggers reported by the {@link PeopleProps.onUpdated} callback.
 */
export type PeopleUpdateTrigger = 'peopleChanged' | 'peopleLoaded' | 'peopleLoadFailed';

/**
 * A person entry rendered by the {@link People} component.
 *
 * This extends the base people search result shape with optional presence fields used
 * for avatar badges when {@link PeopleProps.showPresence} is enabled.
 * Presence fields and additional custom fields are inherited from {@link PersonDetails}.
 */
export type PeoplePerson = PersonDetails & PeopleSearchResult;

/**
 * Event payload reported when the {@link People} component finishes a meaningful update.
 */
export interface PeopleUpdatedEvent {
  /**
   * The reason the component reported the update.
   */
  trigger: PeopleUpdateTrigger;
  /**
   * The resolved people currently rendered by the component.
   */
  people: PeoplePerson[];
  /**
   * Whether the component is still loading data.
   */
  loading: boolean;
  /**
   * The most recent list-loading error, if any.
   */
  error: Error | null;
}

/**
 * Props for the {@link People} component.
 */
export interface PeopleProps extends Omit<AvatarGroupProps, 'children'> {
  /**
   * A pre-resolved list of people to render.
   *
   * When provided, the component skips list discovery and renders these people directly.
   */
  people?: PeoplePerson[];

  /**
   * A list of user identifiers to resolve and render.
   *
   * Values can be Microsoft Graph user IDs, UPNs, email addresses, or `"me"`.
   */
  userIds?: string[];

  /**
   * Additional Graph user fields to request when the component resolves people.
   */
  selectFields?: string[];

  /**
   * Field used to sort the resolved people collection.
   */
  sortBy?: PeopleSortField;

  /**
   * Direction used when {@link PeopleProps.sortBy} is provided.
   *
   * Defaults to `asc`.
   */
  sortDirection?: PeopleSortDirection;

  /**
   * The ID of a Microsoft Entra ID group whose direct user members should be rendered.
   */
  groupId?: string;

  /**
   * Maximum number of visible avatars before the remaining people are shown in overflow.
   *
   * Defaults to `3`, matching the MGT `mgt-people` control.
   */
  showMax?: number;

  /**
   * Whether presence badges should be shown on each avatar.
   *
   * Presence is loaded when the active provider and granted scopes support it.
   */
  showPresence?: boolean;

  /**
   * Called after the component updates its resolved people collection.
   *
   * Use this to react to direct `people` changes, successful list loads, or failed loads.
   *
   * @param event - Details about the update trigger and the current resolved people state.
   */
  onUpdated?: (event: PeopleUpdatedEvent) => void;
}
