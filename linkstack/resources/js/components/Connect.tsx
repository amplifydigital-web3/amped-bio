import { useAppKitAccount } from "@reown/appkit/react";
import { AppKitContext, AppKitContextType } from "./connect/components/AppKitProvider";
import { useContext } from "react";

export default function Web3ConnectButton() {
  const account = useAppKitAccount();
  const ctx = useContext(AppKitContext);
  if (!ctx) {
    throw new Error("AppKitContext is null");
  }
  const { setOpen } = ctx;

  const handleClick = () => {
    if (account.address) {
      // openWeb3Modal();
    } else {
      setOpen(true);
    }
  };

  return (
    <button
      className="dark-button"
      onClick={handleClick}
      // disabled={isConnecting || isReconnecting ? true : undefined}
    >
      {account.address
        ? `${account.address.substring(0, 4)}...${account.address.substring(
          account.address.length - 4
          )}`
        : "Connect Web3 Wallet"}
    </button>
  );
}
