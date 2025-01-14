import { useCallback } from 'react';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { BrandedProgrammeButton } from '../components/Buttons';
import { useConnect } from 'wagmi';
import { coinbaseWallet } from '@wagmi/connectors';

export function CreateWalletButton({
  handleSuccess,
  handleError,
}: {
  handleSuccess: (address: string) => void;
  handleError: (error: unknown) => void;
}) {
  const connect = useConnect();

  const createWallet = useCallback(async () => {
    try {
      const coinbase = coinbaseWallet({
        preference: 'smartWalletOnly',
      });

      const res = await connect.connectAsync({
        chainId: 1,
        // @ts-ignore
        connector: coinbase,
      });

      handleSuccess(res.accounts[0]);
    } catch (error) {
      console.log('error.....', error);
      handleError(error);
    }
  }, [connect, handleSuccess, handleError]);

  return (
    <BrandedProgrammeButton onClick={createWallet}>
      <CoinbaseWalletLogo />
      Connect Coinbase Smart Wallet
    </BrandedProgrammeButton>
  );
}
