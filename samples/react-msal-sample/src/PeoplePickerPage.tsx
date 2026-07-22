import React, { useState } from 'react';
import { PeoplePicker, Person } from '@devsym/graph-toolkit-react';
import type { PeoplePickerPerson } from '@devsym/graph-toolkit-react';
import {
  Body1,
  Body2,
  Card,
  Title3,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { People24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    maxWidth: '600px',
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
  pickerContainer: {
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  selectedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});

export const PeoplePickerPage: React.FC = () => {
  const styles = useStyles();
  const [selectedPeople, setSelectedPeople] = useState<PeoplePickerPerson[]>([]);

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <People24Regular style={{ fontSize: '48px', color: tokens.colorBrandBackground }} />
        <Title3>People Picker</Title3>
      </div>

      <div className={styles.info}>
        <Body1>
          The PeoplePicker component lets users search for and select people from Microsoft Graph.
          It uses the <code>/users</code> endpoint for both typed searches and initial focus
          suggestions. Requires the <code>User.ReadBasic.All</code> scope to search and list people
          from your tenant.
        </Body1>
      </div>

      <div className={styles.pickerContainer}>
        <PeoplePicker
          selectedPeople={selectedPeople}
          onSelectionChange={setSelectedPeople}
          placeholder="Search for people..."
          maxPeople={5}
        />

        {selectedPeople.length > 0 && (
          <div className={styles.selectedList}>
            <Body2>Selected people ({selectedPeople.length}):</Body2>
            {selectedPeople.map(person => (
              <Person
                key={person.id}
                personDetails={person}
                view="threelines"
                fetchImage={false}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
