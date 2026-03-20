import React, { useState } from 'react';
import { useProvider } from '@devsym/graph-toolkit-react';
import {
  Button,
  Tab,
  TabList,
  Title3,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { SignOut24Regular, Person24Regular, People24Regular } from '@fluentui/react-icons';
import { PersonPage } from './PersonPage';
import { PeoplePickerPage } from './PeoplePickerPage';

type NavPage = 'person' | 'people-picker';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    boxShadow: tokens.shadow4,
  },
  headerTitle: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  body: {
    display: 'flex',
    flex: '1',
    minHeight: 0,
  },
  nav: {
    width: '200px',
    padding: '16px 8px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1',
    padding: '32px 24px',
    overflowY: 'auto',
  },
});

export const Dashboard: React.FC = () => {
  const styles = useStyles();
  const provider = useProvider();
  const [activePage, setActivePage] = useState<NavPage>('person');

  const handleLogout = async () => {
    try {
      await provider?.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Title3 className={styles.headerTitle}>Graph Toolkit React</Title3>
        <Button
          appearance="subtle"
          icon={<SignOut24Regular />}
          onClick={() => void handleLogout()}
          style={{ color: tokens.colorNeutralForegroundOnBrand }}
        >
          Sign Out
        </Button>
      </header>

      <div className={styles.body}>
        <nav className={styles.nav}>
          <TabList
            vertical
            selectedValue={activePage}
            onTabSelect={(_, data) => setActivePage(data.value as NavPage)}
          >
            <Tab value="person" icon={<Person24Regular />}>
              Person
            </Tab>
            <Tab value="people-picker" icon={<People24Regular />}>
              People Picker
            </Tab>
          </TabList>
        </nav>

        <main className={styles.content}>
          {activePage === 'person' && <PersonPage />}
          {activePage === 'people-picker' && <PeoplePickerPage />}
        </main>
      </div>
    </div>
  );
};
