import React from 'react';
import { People } from '@devsym/graph-toolkit-react';
import {
  Body1,
  Card,
  Caption1,
  Divider,
  Title3,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { PeopleCommunity24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    maxWidth: '700px',
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
});

export const PeoplePage: React.FC = () => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <PeopleCommunity24Regular
          style={{ fontSize: '48px', color: tokens.colorBrandBackground }}
        />
        <Title3>People</Title3>
      </div>

      <div className={styles.info}>
        <Body1>
          The People component displays a compact strip of people similar to the MGT{' '}
          <code>mgt-people</code> control. By default it loads tenant directory users from{' '}
          <code>/users</code> and shows additional entries in an overflow popover.
        </Body1>
      </div>

      <div className={styles.section}>
        <Body1>Frequent contacts from Microsoft Graph</Body1>
        <People showMax={5} size={40} />
        <Caption1>
          Requires the <code>User.ReadBasic.All</code> delegated scope to list people from your
          tenant directory.
        </Caption1>
      </div>

      <Divider />

      <div className={styles.section}>
        <Body1>Direct data supplied by the app</Body1>
        <People
          showMax={3}
          size={40}
          people={[
            {
              id: 'adele',
              displayName: 'Adele Vance',
              mail: 'adelev@contoso.com',
              jobTitle: 'Product Manager',
            },
            {
              id: 'alex',
              displayName: 'Alex Wilber',
              mail: 'alexw@contoso.com',
              jobTitle: 'Marketing Assistant',
            },
            {
              id: 'megan',
              displayName: 'Megan Bowen',
              mail: 'meganb@contoso.com',
              jobTitle: 'Marketing Manager',
            },
            {
              id: 'lee',
              displayName: 'Lee Gu',
              mail: 'leeg@contoso.com',
              jobTitle: 'Director',
            },
          ]}
        />
        <Caption1>
          Passing <code>people</code> lets you reuse the layout even when your app already has person
          data.
        </Caption1>
      </div>
    </Card>
  );
};
