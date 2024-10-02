import { useContext } from "react";
import { useAccount } from "wagmi";

import { AppContext } from ".";

export default function Web3ConnectButton() {
  const ctx = useContext<any>(AppContext);
  const { address, setAddress, openWeb3Modal, openModal } = ctx;
  const { address: newAddress, isConnecting, isReconnecting } = useAccount();

  console.log("newAddress................. 1", newAddress);
  if (newAddress && newAddress != address) {
    console.log("update newAddress................. 1", newAddress);
    setAddress(newAddress);
  }
  
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
