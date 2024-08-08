import { useContext } from "react";
import { useAccount } from "wagmi";
import { AppContext } from ".";

export default function Web3ConnectButton() {
  const { address, isConnecting, isDisconnected, isReconnecting, isConnected } =
    useAccount();

    const ctx = useContext(AppContext);
  // const { disconnect } = useDisconnect();

  // const parent = this._reactInternalInstance._currentElement._owner._instance;

  console.log("address................. 1", address);
  console.log("isConnected................. 1", isConnected);
  const handleClick = () => {
    if (address && isConnected) {
      // disconnect();
      console.log("Need to disconnect");
    } else if (isDisconnected) {
      // @ts-ignore
      ctx.setOpen(true);
    }
  };

  return (
    <button onClick={handleClick} disabled={isConnecting || isReconnecting}>
      {isConnecting
        ? "Connecting…"
        : isReconnecting
        ? "Reconnecting..."
        : isDisconnected
        ? "Sign In with Web3 Wallet"
        : `0x...${address.substring(address.length - 5)}`}
    </button>
  );
}

// export default Web3ConnectButton;
