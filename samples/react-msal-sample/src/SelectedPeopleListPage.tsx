import React, { useMemo, useState } from 'react';
import {
  PeoplePicker,
  usePeopleList,
} from '@devsym/graph-toolkit-react';
import type { PeoplePickerPerson } from '@devsym/graph-toolkit-react';
import {
  Body1,
  Body2,
  Caption1,
  Card,
  Persona,
  Spinner,
  Title3,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { People24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    maxWidth: '760px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    textAlign: 'center',
  },
  info: {
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    borderLeft: `4px solid ${tokens.colorBrandBackground}`,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  codeBlock: {
    margin: 0,
    padding: '12px 16px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    overflowX: 'auto',
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  peopleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
});

const getPersonLabel = (person: {
  displayName?: string | null;
  mail?: string | null;
  userPrincipalName?: string | null;
  id: string;
}) => person.displayName ?? person.mail ?? person.userPrincipalName ?? person.id;

export const SelectedPeopleListPage: React.FC = () => {
  const styles = useStyles();
  const [selectedPeople, setSelectedPeople] = useState<PeoplePickerPerson[]>([]);
  const storedUserIds = useMemo(() => selectedPeople.map(person => person.id), [selectedPeople]);
  const peopleListOptions = useMemo(
    () => (storedUserIds.length > 0
      ? {
        userIds: storedUserIds,
        sortBy: 'surname' as const,
        selectFields: ['givenName', 'surname'],
      }
      : {
        people: [],
        sortBy: 'surname' as const,
        selectFields: ['givenName', 'surname'],
      }),
    [storedUserIds]
  );
  const { people, loading } = usePeopleList(peopleListOptions);

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <People24Regular style={{ fontSize: '48px', color: tokens.colorBrandBackground }} />
        <Title3>Selected People List</Title3>
      </div>

      <div className={styles.info}>
        <Body1>
          This page demonstrates a common consumer pattern: the picker controls selection, the app
          stores only object IDs, and <code>usePeopleList</code> resolves a sorted list for display.
        </Body1>
      </div>

      <div className={styles.section}>
        <Body1>Choose people</Body1>
        <PeoplePicker
          selectedPeople={selectedPeople}
          onSelectionChange={setSelectedPeople}
          placeholder="Search for people and build a list..."
          maxPeople={8}
        />
        <Caption1>
          Requires <code>User.ReadBasic.All</code> for picker suggestions and loading other users by
          ID.
        </Caption1>
      </div>

      <div className={styles.section}>
        <Body1>Stored object IDs</Body1>
        <Caption1>
          This is the minimal data the app persists from the picker selection.
        </Caption1>
        <pre className={styles.codeBlock}>
          {storedUserIds.length > 0 ? JSON.stringify(storedUserIds, null, 2) : '[]'}
        </pre>
      </div>

      <div className={styles.section}>
        <Body1>Resolved users sorted by surname</Body1>
        <Caption1>
          The list below is loaded from the stored IDs with <code>usePeopleList</code> and sorted by
          <code>surname</code>.
        </Caption1>

        {storedUserIds.length === 0 ? (
          <Body2>Select people above to populate the list.</Body2>
        ) : loading ? (
          <Spinner label="Resolving selected users..." size="tiny" />
        ) : (
          <div className={styles.peopleList}>
            {people.map(person => (
              <Persona
                key={person.id}
                name={getPersonLabel(person)}
                primaryText={getPersonLabel(person)}
                secondaryText={person.jobTitle ?? person.mail ?? undefined}
                tertiaryText={person.department ?? undefined}
                avatar={{
                  image: person.photoUrl ? { src: person.photoUrl } : undefined,
                  name: getPersonLabel(person),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};