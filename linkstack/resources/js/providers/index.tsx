'use client';

import { useEffect, useState, useCallback } from 'react';
import { WagmiProvider } from 'wagmi';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { AppKit } from '@web3modal/base';
import { mainnet, sepolia, polygon, baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AppProvider from './AppProvider';

import WalletProvider, { ConnectModal } from '../lib/connect/main';
// import WalletProvider, { ConnectModal } from '@npaymelabs/connect';

export const projectId = '64c300c731392456340fe626355b366e' as string;

const chains = [mainnet, sepolia, polygon, baseSepolia] as const;

const metadata = {
  name: 'npayme reward',
  description: 'npayme loyalty program toolkit',
  url: process.env.REWARD_URL || '', // origin must match your domain & subdomain
  icons: [],
};

const wagmiConfig = defaultWagmiConfig({
  // @ts-ignore
  chains,
  projectId,
  metadata,
  auth: {
    email: true, // default to true
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
  ssr: true,
  enableInjected: true,
  enableWalletConnect: true,
  enableEIP6963: true,
});

export function Providers({ children }: { children: any }) {
  const [modal, setModal] = useState<any>();

  useEffect(() => {
    if (!modal) {
      const m = createWeb3Modal({
        wagmiConfig,
        projectId,
        themeMode: 'light',
        // defaultChain: mainnet,
        // allWallets: 'ONLY_MOBILE',
        excludeWalletIds: [],
        enableSwaps: true, // Optional - true by default
        themeVariables: {
          '--w3m-color-mix': '#00DCFF',
          '--w3m-color-mix-strength': 20,
        },
      });

      setModal(m);
    }
  }, [modal]);

  const [open, setOpen] = useState<boolean>(false);
  const [w3m, setW3m] = useState<boolean | null>(null);
  const [siwe, setSiwe] = useState<any>(null);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const openWeb3Modal = useCallback(() => setW3m(true), []);
  const requestSIWE = useCallback((args: any) => setSiwe(args), []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // configure as per your needs
          },
        },
      })
  );

  
  return !modal ? null : (
    // @ts-ignore
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider
          config={{
            modal,
            open,
            setOpen,
            w3m,
            setW3m,
            siwe,
            setSiwe,
          }}
        >
          <AppProvider
            openModal={openModal}
            closeModal={closeModal}
            openWeb3Modal={openWeb3Modal}
            requestSIWE={requestSIWE}
          >
            <ConnectModal modal={modal} open={open} setOpen={setOpen} />
            {children}
          </AppProvider>
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
