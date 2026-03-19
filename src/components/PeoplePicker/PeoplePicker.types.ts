/**
 * PeoplePicker component types
 */

import type { TagPickerProps } from '@fluentui/react-components';
import type { PeopleSearchResult } from '../../providers/IPersonDataProvider';

/**
 * A person entry used in the PeoplePicker component.
 *
 * This is an alias for {@link PeopleSearchResult} — both types share the same shape
 * so they can be used interchangeably.
 */
export type PeoplePickerPerson = PeopleSearchResult;

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

  /**
   * User IDs to exclude from search results.
   * When provided, these IDs will be filtered out of the dropdown suggestions.
   * The search will fetch extra results to compensate so that the dropdown still
   * shows up to {@link maxSearchResults} items after exclusion.
   */
  excludeUserIds?: string[];
}
