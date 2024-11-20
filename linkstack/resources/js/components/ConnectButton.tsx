import { useState, useEffect, useCallback, useContext } from "react";

import { AppContext } from "../providers/AppProvider";

const CONNECT_WEB3_WALLET = "Connect Web3 Wallet";
const OPEN_WEB3_WALLET = "Open Web3 Wallet";

export default function Web3ConnectButton() {
  const ctx = useContext<any>(AppContext);
  const { address, openWeb3Modal, openModal } = ctx;

  const [text, setText] = useState(CONNECT_WEB3_WALLET);
  console.log("OneLink address......", address);

  useEffect(() => {
    if (address) {
      setText(OPEN_WEB3_WALLET);
    } else {
      setText(CONNECT_WEB3_WALLET);
    }
  }, [address]);

  const handleClick = useCallback(() => {
    if (address) {
      openWeb3Modal();
    } else {
      openModal();
    }
  },[]);

  const handleMouseOver = useCallback(() => {
    setText(
      address
        ? `${address.substring(0, 4)}...${address.substring(
            address.length - 4
          )}`
        : CONNECT_WEB3_WALLET
    );
  }, [address]);

  const handleMouseLeave = useCallback(() => {
    setText(address ? OPEN_WEB3_WALLET : CONNECT_WEB3_WALLET);
  }, [address]);

  return (
    <button
      className="dark-button"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      // disabled={isConnecting || isReconnecting ? true : undefined}
    >
      {text}
    </button>
  );
}
