import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  mainnet,
  AppKitNetwork,
} from '@reown/appkit/networks';
import { coinbaseWallet } from 'wagmi/connectors'

export const projectId = "e0c0b073645ed7ce3b15930fd2847d6d";

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks: AppKitNetwork[] = [
  mainnet,
];

export const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks,
  connectors: [
    coinbaseWallet()
  ]
});
