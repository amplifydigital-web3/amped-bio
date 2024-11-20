import WalletProvider, {
  useConnectContext,
  AddressType,
  ConnectMessageType,
  WalletContextConfigProps,
} from './components/connect';
import { ConnectModal } from './components/components/ConnectModal';

export { ConnectModal, useConnectContext };
export type { AddressType, ConnectMessageType, WalletContextConfigProps };
export default WalletProvider;
