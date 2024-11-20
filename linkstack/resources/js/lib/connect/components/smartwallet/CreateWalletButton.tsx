import { useEffect, useState, useCallback } from 'react';
import { CoinbaseWalletSDK, ProviderInterface } from '@coinbase/wallet-sdk';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { BrandedProgrammeButton } from '../components/Buttons';

export function CreateWalletButton({
  handleSuccess,
  handleError,
}: {
  handleSuccess: (address: string) => void;
  handleError: (error: unknown) => void;
}) {
  const [provider, setProvider] = useState<ProviderInterface>();

  useEffect(() => {
    if (!provider) {
      const sdk = new CoinbaseWalletSDK({
        appName: 'npayme connect',
        appLogoUrl: 'https://example.com/logo.png',
        appChainIds: [84532],
      });

      const ethereum = sdk.makeWeb3Provider();

      setProvider(ethereum);
    }
  }, [provider]);

  const createWallet = useCallback(async () => {
    try {
      // @ts-ignore
      const [address] = await provider.request({
        method: 'eth_requestAccounts',
      });
      console.log('coinbase smart wallet address:', address);
      handleSuccess(address);
    } catch (error) {
      console.log('error.....', error);
      handleError(error);
    }
  }, [provider, handleSuccess, handleError]);

  // const { connectors, connect, data } = useConnect()
  // const createWallet = useCallback(() => {
  //   const coinbaseWalletConnector = connectors.find(
  //     (connector) => connector.id === 'coinbaseWalletSDK'
  //   )
  //   if (coinbaseWalletConnector) {
  //     connect({ connector: coinbaseWalletConnector })
  //   }
  // }, [connectors, connect])

  return provider ? (
    <BrandedProgrammeButton onClick={createWallet}>
      <CoinbaseWalletLogo />
      Connect Coinbase Smart Wallet
    </BrandedProgrammeButton>
  ) : null;
}
