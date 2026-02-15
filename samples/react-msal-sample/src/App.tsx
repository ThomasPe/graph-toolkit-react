import { useEffect, useState } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { GraphProvider, MsalBrowserProvider, ProviderState } from '@medienstudio/graph-toolkit-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { authConfig, msalConfig } from './authConfig';
import { Login } from './Login';
import { Dashboard } from './Dashboard';

const publicClientApplication = new PublicClientApplication(msalConfig);

function App() {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<ProviderState>('Loading');
  const [provider, setProvider] = useState<MsalBrowserProvider | null>(null);

  useEffect(() => {
    let disposed = false;

    const init = async () => {
      const nextProvider = new MsalBrowserProvider(publicClientApplication, authConfig.scopes);
      await nextProvider.initialize();

      if (disposed) return;

      setProvider(nextProvider);
      setState(nextProvider.getState());
      nextProvider.onStateChanged?.(() => setState(nextProvider.getState()));
      setReady(true);
    };

    void init();

    return () => {
      disposed = true;
    };
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      {ready && provider ? (
        <GraphProvider provider={provider}>{state === 'SignedIn' ? <Dashboard /> : <Login />}</GraphProvider>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          Loading...
        </div>
      )}
    </FluentProvider>
  );
}

export default App;
