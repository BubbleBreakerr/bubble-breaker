import getSDK from '@akashaorg/awf-sdk';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from './use-theme';
import { logError } from './utils/error-handler';

export function useConnectWallet() {
  const { theme } = useTheme();
  const sdk = getSDK();

  useEffect(() => {
    if (theme === 'Dark-Theme' && sdk.services.common.web3.getCurrentTheme() !== 'dark') {
      sdk.services.common.web3.toggleDarkTheme(true);
      return;
    }
    if (theme === 'Light-Theme' && sdk.services.common.web3.getCurrentTheme() !== 'light') {
      sdk.services.common.web3.toggleDarkTheme();
    }
  }, [sdk.services.common.web3, theme]);

  const [data, setData] = useState<string | null>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const connect = useCallback(() => {
    setIsLoading(true);
    const connectWalletApiCall = async () => {
      try {
        const resp = await sdk.api.auth.connectAddress();
        if (resp) {
          setData(resp);
          setIsLoading(false);
        }
      } catch (err) {
        logError('useConnectWallet', err);
        setError(err);
        setData(null);
      }
    };

    connectWalletApiCall();
  }, []);

  return { connect, data, isLoading, error, isSuccess: !!data, isError: !!error };
}
