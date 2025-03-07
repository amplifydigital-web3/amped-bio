import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { ModalContext } from "./connect/components/AppKitProvider";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useChainId, useConfig } from "wagmi";
import styled from "styled-components";
import { getWalletClient } from "@wagmi/core";
import useMemoizeValue from "../hooks/useMemoizeValue";
import { setBusinessId } from "../repository";

// Toggle for enabling detailed logs - can be changed based on environment
const ENABLE_DETAILED_LOGS = false;

// Custom logger that obeys the toggle and checks global window variable
const logger = {
  info: (message: string, ...args: any[]) => {
    // Check both the local constant and the global window variable (if available)
    if (
      ENABLE_DETAILED_LOGS ||
      (typeof window !== 'undefined' && window.ONELINK_DEBUG)
    ) {
      console.info(`[onelink] ${message}`, ...args);
    }
  },
  debug: (message: string, ...args: any[]) => {
    // Most verbose logging level
    if (
      (typeof window !== 'undefined' && window.ONELINK_DEBUG === 'verbose') ||
      process.env.NODE_ENV === 'development'
    ) {
      console.debug(`[onelink] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    // Warnings are always logged in development
    if (process.env.NODE_ENV !== 'production' || ENABLE_DETAILED_LOGS) {
      console.warn(`[onelink] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: any[]) => {
    // Always log errors regardless of toggle
    console.error(`[onelink] ${message}`, ...args);
  },
};

// Add type declaration for the window object to support the debug flag
declare global {
  interface Window {
    ONELINK_DEBUG?: boolean | 'verbose';
  }
}

enum MessageType {
  RPC = 'rpc_request',
  RPC_RESPONSE = 'rpc_response',
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

const Wrapper = styled.div`

.dark-button {
  color: #ffffff;
  margin-top: 2px;
  margin-right: 6px;
  margin-left: 6px;
  padding: 2px 8px 2px 8px;
  background-color: rgb(86, 58, 232);
  border-color: rgb(86, 58, 232);
  border-radius: 6px;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
}

.dark-button:active {
  color: #ffffff;
  background-color: #2e46ba;
  border-color: #2c41ae;
}

.dark-button:hover {
  color: #ffffff;
  background-color: #314ac5;
  border-color: #2e46ba;
}

.dark-button:disabled {
  color: #ffffff;
  background-color: #3a57e8;
  border-color: #3a57e8;
}
`

export default function Web3ConnectButton() {
  const ctx = useContext(ModalContext);
  const wallet = useAppKit()
  const account = useAppKitAccount();
  const chain = useChainId();
  const config = useConfig();

  logger.info("Web3ConnectButton initialized - Account:", account.address, "Chain:", chain);

  const rewardRef = useRef<HTMLIFrameElement | null>(null);

  const memoizedAccount = useMemoizeValue(account.address);
  const memoizedAccountConnected = useMemoizeValue(account.isConnected);
  const memoizedChain = useMemoizeValue(chain);

  if (!ctx) {
    logger.error("AppKitContext is null - Component cannot function properly");
    throw new Error("AppKitContext is null");
  }
  const { setOpen } = ctx;

  useEffect(() => {
    if (memoizedAccountConnected[0] === true && memoizedAccountConnected[1] === false) {
      logger.info("Wallet disconnection detected - Previous state:", memoizedAccountConnected[0], "Current state:", memoizedAccountConnected[1]);

      // currently not working, just send the other event and force disconnect using hook useDisconnect.
      // rewardRef.current?.contentWindow?.postMessage({
      //   id: 0, type: MessageType.UPDATE, data: {
      //     event: "disconnect",
      //     data: null
      //   }
      // } as UpdateMessage, '*');

      rewardRef.current?.contentWindow?.postMessage({ type: 'disconnect_onelink' }, '*');
      logger.debug("Sent disconnect_onelink message to iframe");
    } else if (memoizedChain[0] !== undefined && memoizedChain[0] !== memoizedChain[1]) {
      logger.info("Chain change detected - Previous chain:", memoizedChain[0], "New chain:", memoizedChain[1]);
      rewardRef.current?.contentWindow?.postMessage({
        id: 0, type: MessageType.UPDATE, data: {
          event: "chainChanged",
          data: memoizedChain[1]
        }
      } as UpdateMessage, '*');
      logger.debug("Sent chainChanged message to iframe with new chain:", memoizedChain[1]);
    } else if (memoizedAccount[0] !== memoizedAccount[1]) {
      logger.info("Account change detected - Previous account:", memoizedAccount[0], "New account:", memoizedAccount[1]);
      rewardRef.current?.contentWindow?.postMessage({
        id: 0, type: MessageType.UPDATE, data: {
          event: "accountsChanged",
          data: [memoizedAccount[1]]
        }
      } as UpdateMessage, '*');
      logger.debug("Sent accountsChanged message to iframe with new account:", memoizedAccount[1]);
    }
  }, [memoizedAccount, memoizedAccountConnected, memoizedChain]);

  const [rewardLastPong, setRewardLastPong] = useState<Date | null>(null);

  const isRewardConnected = useMemo((() => {
    return rewardLastPong ? new Date().getTime() - rewardLastPong.getTime() < 5000 : false;
  }), [rewardLastPong]);

  useEffect(() => {
    logger.info("Reward connection status changed - Connected:", isRewardConnected, "Last pong:", rewardLastPong);
  }, [isRewardConnected, rewardLastPong]);

  const handleClick = useCallback(() => {
    if (account.address) {
      logger.info("Opening wallet for connected account:", account.address);
      wallet.open();
    } else {
      logger.info("Opening connection modal for new account");
      setOpen(true);
    }
  }, [account.address, wallet, setOpen]);

  useEffect(() => {
    logger.debug("Setting up message listeners and ping interval");
    rewardRef.current = document.getElementById("iframe-npayme-reward") as HTMLIFrameElement | null;
    
    if (rewardRef.current) {
      logger.debug("Reward iframe found:", rewardRef.current.id);
    } else {
      logger.warn("Reward iframe not found - messaging will not work");
    }

    const sendPing = () => {
      if (rewardRef.current && rewardRef.current.contentWindow) {
        rewardRef.current.contentWindow.postMessage({ type: 'ping_onelink', address: account.address }, '*');
      }
    };

    const handleMessage = async (event: MessageEvent) => {
      logger.debug("Received message from iframe:", event.data.type);
      
      if (event.data.type === 'reward_initialized') {
        sendPing();
      } if (event.data.type === 'pong_reward') {
        const now = new Date();
        setRewardLastPong(now);
        logger.debug("Received pong response from reward iframe at:", now.toISOString());
      } else if (event.data.type === 'open_modal') {
        logger.info("Received request to open wallet modal");
        handleClick();
      } else if (event.data.type === MessageType.RPC) {
        const data = event.data as RpcRequestMessage;
        logger.info("Received RPC request:", data.data.method, "with params:", data.data.params);

        try {
          const startTime = performance.now();
          const client = await getWalletClient(config);
          
          if (!client) {
            logger.error("No wallet client available for RPC request");
            return;
          }

          const res = await client.request({
            method: event.data.data.method,
            params: event.data.data.params,
          });
          const endTime = performance.now();
          logger.debug(`RPC request completed in ${(endTime - startTime).toFixed(2)}ms:`, event.data.data.method, res);

          rewardRef.current?.contentWindow?.postMessage({
            id: data.id,
            type: MessageType.RPC_RESPONSE,
            data: res,
          }, '*');
          logger.debug("Sent RPC response to iframe for request ID:", data.id);
        } catch (error) {
          logger.error("Error processing RPC request:", error);
        }
      } else if (event.data.type === "set_business_id") {
        logger.info("Received request to set business ID:", event.data.business_id);
        try {
          await setBusinessId(event.data.business_id);
          logger.info("Business ID successfully updated to:", event.data.business_id);
        } catch (error) {
          logger.error("Failed to set business ID:", error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    logger.debug("Message event listener registered");

    const intervalId = setInterval(sendPing, 1000);
    logger.debug("Ping interval started - frequency: 1000ms");

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('message', handleMessage);
      logger.debug("Cleaned up message listener and ping interval");
    };
  }, [account.address, config, handleClick]);

  return (
    <Wrapper>
      <button
        className="dark-button"
        onClick={handleClick}
      >
        {account.address
          ? `${account.address.substring(0, 4)}...${account.address.substring(
            account.address.length - 4
          )}`
          : "Connect Web3 Wallet"}
      </button>
    </Wrapper>
  );
}
