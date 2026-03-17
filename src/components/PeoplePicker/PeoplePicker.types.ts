/**
 * PeoplePicker component types
 */

import type { TagPickerProps } from '@fluentui/react-components';

/**
 * A person entry used in the PeoplePicker component.
 */
export interface PeoplePickerPerson {
  /**
   * Unique identifier for the person (Microsoft Graph user ID)
   */
  id: string;
  /**
   * The person's display name
   */
  displayName?: string | null;
  /**
   * The person's primary email address
   */
  mail?: string | null;
  /**
   * The person's user principal name
   */
  userPrincipalName?: string | null;
  /**
   * The person's job title
   */
  jobTitle?: string | null;
  /**
   * The department the person belongs to
   */
  department?: string | null;
}

/**
 * Props for the {@link PeoplePicker} component.
 */
export interface PeoplePickerProps
  extends Pick<TagPickerProps, 'appearance' | 'size' | 'disabled'> {
  /**
   * Currently selected people (controlled mode).
   * When provided, the component operates in controlled mode and does not manage its own selection state.
   */
  selectedPeople?: PeoplePickerPerson[];

  /**
   * Initial selected people (uncontrolled mode).
   * Ignored when {@link selectedPeople} is provided.
   */
  defaultSelectedPeople?: PeoplePickerPerson[];

  /**
   * Called when the selection changes.
   * @param people - The new array of selected people
   */
  onSelectionChange?: (people: PeoplePickerPerson[]) => void;

  /**
   * Placeholder text shown in the search input when nothing is typed
   */
  placeholder?: string;

  /**
   * Maximum number of people that can be selected.
   * When reached the search input is hidden.
   */
  maxPeople?: number;

  /**
   * Minimum number of characters required before a search is triggered (default: 1)
   */
  searchMinChars?: number;

  /**
   * Maximum number of search results to show in the dropdown (default: 10)
   */
  maxSearchResults?: number;
}
