/**
 * PeoplePicker component - Select one or more people using Microsoft Graph search
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  Avatar,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerOnOptionSelectData,
} from '@fluentui/react-components';
import { SearchRegular } from '@fluentui/react-icons';
import { usePeopleSearch } from '../../hooks/usePeopleSearch';
import { getInitials } from '../../utils/graph';
import { PeoplePickerPerson, PeoplePickerProps } from './PeoplePicker.types';

/** Sentinel value used for the "No people found" option */
const NO_RESULTS_OPTION_VALUE = '__no_results__';

/**
 * Resolve the display label for a person
 */
const getPersonLabel = (person: PeoplePickerPerson): string =>
  person.displayName || person.mail || person.userPrincipalName || person.id;

/**
 * Resolve the secondary label (email / UPN) for a person option
 */
const getPersonSecondary = (person: PeoplePickerPerson): string | undefined =>
  person.mail ?? person.userPrincipalName ?? undefined;

/**
 * PeoplePicker — a tag-picker backed by Microsoft Graph people search.
 *
 * In controlled mode supply `selectedPeople` + `onSelectionChange`.
 * In uncontrolled mode supply `defaultSelectedPeople` or leave both props unset.
 *
 * The component automatically uses {@link MockProvider} mock data when no real
 * Graph provider is available, making it easy to prototype UIs without auth.
 *
 * @example
 * ```tsx
 * <PeoplePicker
 *   placeholder="Search for people..."
 *   onSelectionChange={(people) => console.log(people)}
 * />
 * ```
 */
export const PeoplePicker: React.FC<PeoplePickerProps> = ({
  selectedPeople,
  defaultSelectedPeople,
  onSelectionChange,
  placeholder = 'Search for people...',
  maxPeople,
  searchMinChars = 1,
  maxSearchResults = 10,
  appearance,
  size,
  disabled,
}) => {
  const isControlled = selectedPeople !== undefined;

  const [internalSelectedPeople, setInternalSelectedPeople] = useState<PeoplePickerPerson[]>(
    defaultSelectedPeople ?? []
  );

  const effectiveSelected = isControlled ? selectedPeople : internalSelectedPeople;

  const [searchQuery, setSearchQuery] = useState('');

  const { results: searchResults, loading: searchLoading } = usePeopleSearch(searchQuery, {
    minChars: searchMinChars,
    maxResults: maxSearchResults,
  });

  // Build a lookup map so we can resolve a person object from its ID
  const peopleLookup = useMemo(() => {
    const map = new Map<string, PeoplePickerPerson>();
    for (const p of effectiveSelected) {
      map.set(p.id, p);
    }
    for (const p of searchResults) {
      map.set(p.id, p);
    }
    return map;
  }, [effectiveSelected, searchResults]);

  const selectedIds = useMemo(() => effectiveSelected.map((p) => p.id), [effectiveSelected]);

  const handleOptionSelect = useCallback(
    (_e: React.SyntheticEvent | Event, data: TagPickerOnOptionSelectData) => {
      const newPeople = data.selectedOptions
        .filter((id) => id !== NO_RESULTS_OPTION_VALUE)
        .map((id) => peopleLookup.get(id))
        .filter((p): p is PeoplePickerPerson => p !== undefined);

      if (!isControlled) {
        setInternalSelectedPeople(newPeople);
      }
      onSelectionChange?.(newPeople);
      // Clear the search query after selection
      setSearchQuery('');
    },
    [isControlled, onSelectionChange, peopleLookup]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const isAtMax = maxPeople !== undefined && effectiveSelected.length >= maxPeople;

  // Filter out already-selected options from suggestions
  const filteredResults = useMemo(
    () => searchResults.filter((p) => !selectedIds.includes(p.id)),
    [searchResults, selectedIds]
  );

  return (
    <TagPicker
      onOptionSelect={handleOptionSelect}
      selectedOptions={selectedIds}
      appearance={appearance}
      size={size}
      disabled={disabled}
    >
      <TagPickerControl expandIcon={<SearchRegular />}>
        <TagPickerGroup>
          {effectiveSelected.map((person) => (
            <InteractionTag key={person.id} value={person.id} shape="circular">
              <InteractionTagPrimary
                media={
                  <Avatar
                    name={person.displayName ?? undefined}
                    initials={getInitials(person.displayName ?? undefined)}
                    size={20}
                  />
                }
              >
                {getPersonLabel(person)}
              </InteractionTagPrimary>
              <InteractionTagSecondary
                aria-label={`Remove ${getPersonLabel(person)}`}
              />
            </InteractionTag>
          ))}
        </TagPickerGroup>
        {!isAtMax && (
          <TagPickerInput
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={effectiveSelected.length === 0 ? placeholder : undefined}
            disabled={disabled}
          />
        )}
      </TagPickerControl>
      <TagPickerList>
        {searchQuery.length >= searchMinChars && !searchLoading && filteredResults.length === 0 && (
          <TagPickerOption value={NO_RESULTS_OPTION_VALUE} text="No people found" style={{ pointerEvents: 'none', color: 'var(--colorNeutralForegroundDisabled)' }}>
            No people found
          </TagPickerOption>
        )}
        {filteredResults.map((person) => (
          <TagPickerOption
            key={person.id}
            value={person.id}
            media={
              <Avatar
                name={person.displayName ?? undefined}
                initials={getInitials(person.displayName ?? undefined)}
                size={32}
              />
            }
            secondaryContent={getPersonSecondary(person)}
          >
            {getPersonLabel(person)}
          </TagPickerOption>
        ))}
      </TagPickerList>
    </TagPicker>
  );
};
