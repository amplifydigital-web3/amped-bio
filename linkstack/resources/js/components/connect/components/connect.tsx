'use client';

import React, {
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { AppKit } from '@reown/appkit';
import { useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

export type AddressType = `0x${string}` | undefined;

export type ConnectMessageType = {
  domain: string;
  address: string;
  statement: string;
  uri: string;
  version: string;
  chainId: number;
  nonce: string;
  targets: string[];
};

export type WalletContextConfigProps = {
  modal: AppKit;
  brandColor?: string;
  copyColor?: string;
  open?: boolean | null;
  setOpen: (open: boolean) => void;
  w3m: boolean | null;
  setW3m: (we3: boolean | null) => void;
  // onAccountChanged: (any: any, prev?: number | string) => void;
  onNetworkChanged?: (any: number, prev?: number | string) => void;
  siwe?: any;
  setSiwe?: any;
};

type WalletContextProviderProps = {
  config: WalletContextConfigProps;
  children: React.ReactNode;
};

type ConnectContextType = {
  address: AddressType;
  signMessageAsync: (siwe: ConnectMessageType) => Promise<any>;
};

const ConnectContext = createContext<ConnectContextType | null>(null);

export default function WalletProvider(parameters: WalletContextProviderProps) {
  const { children, config } = parameters || { config: {} };
  const { modal, brandColor, copyColor, w3m, setW3m, siwe, setSiwe } = config;

  // const address = modal.getAddress() as AddressType;
  // const isConnected = modal.getIsConnected();
  // const status = modal.getState();
  const { address, isConnected, status } = useAppKitAccount();

  const { open: openWeb3Modal } = useAppKit();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    console.log(
      '@npaymelabs/connect address...............',
      address as AddressType,
      isConnected,
      status
    );
  }, [address, isConnected, status]);

  useEffect(() => {
    if (siwe && address) {
      handleSiwe(siwe);
      if (typeof setSiwe === 'function') {
        setTimeout(() => {
          setSiwe(null);
        }, 0);
      }
    }
  }, [siwe]);

  const handleSiwe = useCallback(async (siwe: ConnectMessageType) => {
    try {
      const {
        domain,
        address,
        statement,
        uri,
        version,
        chainId,
        nonce,
        targets = [],
      } = siwe;
      console.log(
        domain,
        address,
        statement,
        uri,
        version,
        chainId,
        nonce,
        targets
      );

      // const message = toMessage(domain, address, statement, uri, version, chainId, nonce);
      console.log('Debug.............');
      const message = new SiweMessage({
        domain,
        address,
        statement,
        uri,
        version,
        chainId,
        nonce,
      }).prepareMessage();

      
      // @ts-ignore
      // eslint-disable-next-line no-undef
      const signature = await signMessageAsync({ message });

      if (targets && targets.length > 0) {
        for (let i = 0; i < targets.length; i++) {
          const iFrm = document.getElementById(targets[i]);
          if (iFrm) {
            // @ts-ignore
            iFrm.contentWindow.postMessage(
              {
                type: '@npaymelabs/connect/siwe',
                payload: {
                  message,
                  signature,
                },
              },
              '*'
            );
          }
        }
      }

      return signature;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty(
        '--npayme__brand-color',
        brandColor || '#000'
      );
      document.documentElement.style.setProperty(
        '--npayme__copy-color',
        copyColor || '#fff'
      );
      document.documentElement.style.setProperty('--widget-card', '#fff');
      document.documentElement.style.setProperty(
        '--widget-contrast',
        '#1A1A1A'
      );
      document.documentElement.style.setProperty(
        '--widget-contrast-low',
        '#A64646'
      );
      document.documentElement.style.setProperty(
        '--widget-contrast-high',
        '#000'
      );

      document.documentElement.style.setProperty(
        '--bg',
        copyColor || '#f2f4f5'
      );
    }
  }, []);

  useEffect(() => {
    if (w3m === true && modal) {
      setTimeout(() => {
        setW3m(null);
        // modal.open();
        openWeb3Modal();
      }, 0);
    }
  }, [w3m]);

  return (
    <ConnectContext.Provider
      value={{
        address: address as AddressType,
        signMessageAsync: handleSiwe,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
}

export function useConnectContext() {
  const context = useContext(ConnectContext);
  if (!context) {
    throw new Error(
      'useConnectContext must be use withinConnectContextProvider'
    );
  }
  return context;
}
