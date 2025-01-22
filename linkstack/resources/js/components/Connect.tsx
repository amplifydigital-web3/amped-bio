import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { ModalContext } from "./connect/components/AppKitProvider";
import { useContext, useEffect, useMemo, useState } from "react";
import { useAppKitWallet } from "@reown/appkit-wallet-button/react";
import { useWalletClient } from "wagmi";

enum MessageType {
  RPC = 'rpc_request',
  UPDATE = 'update',
}

type RpcRequestMessage = {
  id: number;
  type: MessageType.RPC;
  data: {
    method: string;
    params?: any[];
  }
}

type UpdateMessage = {
  id: number;
  type: MessageType.UPDATE;
  data: {
    event: "accountsChanged" | "chainChanged" | "disconnect";
    data: any;
  }
}

export default function Web3ConnectButton() {
  const ctx = useContext(ModalContext);
  const wallet = useAppKit()
  const client = useWalletClient();

  if (!ctx) {
    throw new Error("AppKitContext is null");
  }
  const { setOpen } = ctx;
  const account = useAppKitAccount();

  const [rewardLastPong, setRewardLastPong] = useState<Date | null>(null);

  const isRewardConnected = useMemo(( ()=> {
    return rewardLastPong ? new Date().getTime() - rewardLastPong.getTime() < 5000 : false;
  }), [rewardLastPong]);

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
    reward
    const sendPing = () => {
      if (reward && reward.contentWindow && account.address) {
        reward.contentWindow.postMessage({ type: 'ping_onelink', address: account.address }, '*');
      }
    };

    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'pong_reward') {
        setRewardLastPong(new Date());
        // window.removeEventListener('message', handleMessage);

        // const handleOpenModal = (event: MessageEvent) => {
        //   if (event.data.type === 'open_modal') {
        //     handleClick();
        //     window.removeEventListener('message', handleOpenModal);
        //   }
        // };

        // window.addEventListener('message', handleOpenModal);
      } else if (event.data.type === 'open_modal') {
        handleClick();
      } else if (event.data.type === MessageType.RPC) {
        const data = event.data as RpcRequestMessage;

        const res = await client.data?.request({
          method: event.data.data.method,
          params: event.data.data.params,
        });

        reward?.contentWindow?.postMessage({
          id: data.id,
          type: MessageType.RPC,
          data: res,
        }, '*');
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
