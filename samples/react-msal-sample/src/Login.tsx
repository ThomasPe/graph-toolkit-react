import React from 'react';
import { Button, Title2, Body1, Card, makeStyles, tokens } from '@fluentui/react-components';
import { ShieldCheckmark24Regular } from '@fluentui/react-icons';
import { authConfig } from './authConfig';
import { useProvider } from '@medienstudio/graph-toolkit-react';

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
    maxWidth: '500px',
    width: '100%',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    fontSize: '64px',
    color: tokens.colorBrandBackground,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  info: {
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    textAlign: 'left',
  },
});

export const Login: React.FC = () => {
  const styles = useStyles();
  const provider = useProvider();

  const handleLogin = async () => {
    try {
      await provider?.login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <ShieldCheckmark24Regular className={styles.icon} />
        <Title2>Graph Toolkit React</Title2>
        <Body1>Sign in with your Microsoft account to view your profile using the Person component.</Body1>

        <div className={styles.info}>
          <Body1 style={{ fontWeight: 600 }}>Configuration Required:</Body1>
          <Body1>
            Before signing in, update the <code>authConfig.ts</code> file with your Azure AD application credentials:
          </Body1>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>
              <Body1>Client ID: <code>{authConfig.clientId === 'YOUR_CLIENT_ID_HERE' ? 'NOT SET' : 'SET'}</code></Body1>
            </li>
            <li>
              <Body1>Authority: <code>{authConfig.authority}</code></Body1>
            </li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Button appearance="primary" size="large" onClick={handleLogin}>
            Sign in with Microsoft
          </Button>
        </div>
      </Card>
    </div>
  );
};
