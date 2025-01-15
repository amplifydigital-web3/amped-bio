import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { ModalContext } from "./connect/components/AppKitProvider";
import { useContext } from "react";

export default function Web3ConnectButton() {
  const ctx = useContext(ModalContext);
  const wallet = useAppKit()

  if (!ctx) {
    throw new Error("AppKitContext is null");
  }
  const { setOpen } = ctx;
  const account = useAppKitAccount();

  const handleClick = () => {
    if (account.address) {
      // openWeb3Modal();
      wallet.open();
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
