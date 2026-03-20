import React, { useState } from 'react';
import { PeoplePicker } from '@devsym/graph-toolkit-react';
import type { PeoplePickerPerson } from '@devsym/graph-toolkit-react';
import {
  Body1,
  Body2,
  Badge,
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
  selectedItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
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
            {selectedPeople.map(person => {
              const label =
                person.displayName ??
                person.mail ??
                person.userPrincipalName ??
                person.id;
              return (
                <div key={person.id} className={styles.selectedItem}>
                  <Badge appearance="filled" color="brand" shape="circular">
                    {label.charAt(0).toUpperCase()}
                  </Badge>
                  <div>
                    <Body2>{label}</Body2>
                    {person.mail && person.mail !== label && (
                      <Body1 style={{ color: tokens.colorNeutralForeground3 }}>
                        {person.mail}
                      </Body1>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};
