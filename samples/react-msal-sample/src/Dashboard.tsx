import React from 'react';
import { Person, useProvider } from '@devsym/graph-toolkit-react';
import { Button, Title3, Subtitle1, Body1, Card, makeStyles, tokens } from '@fluentui/react-components';
import { SignOut24Regular, Person24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  card: {
    maxWidth: '600px',
    width: '100%',
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
  personContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  info: {
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    borderLeft: `4px solid ${tokens.colorBrandBackground}`,
  },
});

export const Dashboard: React.FC = () => {
  const styles = useStyles();
  const provider = useProvider();

  const handleLogout = async () => {
    try {
      await provider?.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <Person24Regular style={{ fontSize: '48px', color: tokens.colorBrandBackground }} />
          <Title3>Welcome to Graph Toolkit React</Title3>
          <Subtitle1>MSAL Authentication Sample</Subtitle1>
        </div>

        <div className={styles.info}>
          <Body1>
            This sample demonstrates how to use the Person component with native MSAL browser authentication. The
            Person component below displays your user information fetched from Microsoft Graph using the &quot;me&quot; query.
          </Body1>
        </div>

        <div className={styles.personContainer}>
          <Person
            userId="me"
            view="threelines"
            size="large"
            showPresence={true}
            personCardInteraction="hover"
          />
        </div>

        <div className={styles.actions}>
          <Button appearance="primary" icon={<SignOut24Regular />} onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
