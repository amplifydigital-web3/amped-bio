import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { ModalContext } from "./connect/components/AppKitProvider";
import { useContext, useEffect } from "react";

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

  useEffect(() => {
    const reward = document.getElementById("iframe-npayme-reward") as HTMLIFrameElement | null;

    const sendPing = () => {
      if (reward && reward.contentWindow && account.address) {
        reward.contentWindow.postMessage({ type: 'ping_onelink', address: account.address }, '*');
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'pong_reward') {
        window.removeEventListener('message', handleMessage);

        const handleOpenModal = (event: MessageEvent) => {
          if (event.data.type === 'open_modal') {
            handleClick();
            window.removeEventListener('message', handleOpenModal);
          }
        };

        window.addEventListener('message', handleOpenModal);
      }
    };

    window.addEventListener('message', handleMessage);

    const intervalId = setInterval(sendPing, 1000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('message', handleMessage);
    };
  }, [account.address]);

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
