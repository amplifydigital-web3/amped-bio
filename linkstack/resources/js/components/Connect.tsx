import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";
import { AppContext } from ".";

export default function Web3ConnectButton() {
  const ctx = useContext<any>(AppContext);
  const { openWeb3Modal, openModal } = ctx;
  const { address } = useAccount();

  useEffect(() => {
    console.log("newAddress................. 1", address);
    console.log("update newAddress................. 1", address);
  }, []);

  const handleClick = () => {
    if (address) {
      openWeb3Modal();
    } else {
      openModal();
    }
  };

  return (
    <button
      className="dark-button"
      onClick={handleClick}
      // disabled={isConnecting || isReconnecting ? true : undefined}
    >
      {address
        ? `${address.substring(0, 4)}...${address.substring(
            address.length - 4
          )}`
        : "Connect Web3 Wallet"}
    </button>
  );
}
