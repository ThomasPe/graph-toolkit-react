import React from 'react';
import { Person } from '@devsym/graph-toolkit-react';
import { Body1, Card, Title3, makeStyles, tokens } from '@fluentui/react-components';
import { Person24Regular } from '@fluentui/react-icons';

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
  personContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const PersonPage: React.FC = () => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Person24Regular style={{ fontSize: '48px', color: tokens.colorBrandBackground }} />
        <Title3>Person</Title3>
      </div>

      <div className={styles.info}>
        <Body1>
          The Person component displays a user&apos;s profile information fetched from Microsoft
          Graph. It supports various display modes and can optionally show presence status.
        </Body1>
      </div>

      <div className={styles.personContainer}>
        <Person userId="me" view="threelines" size="large" showPresence={true} />
      </div>
    </Card>
  );
};
