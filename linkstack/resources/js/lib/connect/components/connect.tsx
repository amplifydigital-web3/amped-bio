'use client';

import React, { useEffect, useCallback, createContext, useContext } from 'react';
import { AppKit } from '@web3modal/base';
import { useAccount } from 'wagmi';
import { SiweMessage } from 'siwe';
import { randomStringForEntropy } from '@stablelib/random';

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

export const generateNonce = (): string => {
  const nonce = randomStringForEntropy(96);
  if (!nonce || nonce.length < 8) {
    throw new Error('Error during nonce creation.');
  }
  return nonce;
};

// @ts-ignore
function toMessage(domain, address, statement, uri, version, chainId, nonce) {
  console.log(domain, address, statement, uri, version, chainId, nonce);
  // /** Validates all fields of the object */
  // this.validateMessage();
  // const headerPrefx = this.scheme ? `${this.scheme}://${this.domain}` : this.domain;
  // const header = `${headerPrefx} wants you to sign in with your Ethereum account:`;
  // const uriField = `URI: ${this.uri}`;
  // let prefix = [header, this.address].join('\n');
  // const versionField = `Version: ${this.version}`;

  // const chainField = `Chain ID: ` + this.chainId || '1';

  const nonceField = `Nonce: ${generateNonce()}`;

  // const suffixArray = [uriField, versionField, chainField, nonceField];

  // this.issuedAt = this.issuedAt || new Date().toISOString();

  // suffixArray.push(`Issued At: ${this.issuedAt}`);

  // if (this.expirationTime) {
  //   const expiryField = `Expiration Time: ${this.expirationTime}`;

  //   suffixArray.push(expiryField);
  // }

  // if (this.notBefore) {
  //   suffixArray.push(`Not Before: ${this.notBefore}`);
  // }

  // if (this.requestId) {
  //   suffixArray.push(`Request ID: ${this.requestId}`);
  // }

  // if (this.resources) {
  //   suffixArray.push(
  //     [`Resources:`, ...this.resources.map(x => `- ${x}`)].join('\n')
  //   );
  // }

  // const suffix = suffixArray.join('\n');
  // prefix = [prefix, this.statement].join('\n\n');
  // if (this.statement) {
  //   prefix += '\n';
  // }
  // return [prefix, suffix].join('\n');

  return '123' + nonceField;
}

export default function WalletProvider(parameters: WalletContextProviderProps) {
  const { children, config } = parameters || { config: {} };
  const { modal, brandColor, copyColor, w3m, setW3m, siwe, setSiwe } = config;

  const { address, isConnected, status } = useAccount();
  console.log('@npaymelabs/connect address...............', address, isConnected, status);

  useEffect(() => {
    if (siwe && address) {
      handleSiwe(siwe);
      if (typeof setSiwe === 'function') {
        setSiwe(null);
      }
    }
  }, [siwe]);

  const handleSiwe = useCallback(async (siwe: ConnectMessageType) => {
    try {
      const { domain, address, statement, uri, version, chainId, nonce, targets = [] } = siwe;
      console.log(domain, address, statement, uri, version, chainId, nonce, targets);

      // const message = toMessage(domain, address, statement, uri, version, chainId, nonce);

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
      document.documentElement.style.setProperty('--npayme__brand-color', brandColor || '#000');
      document.documentElement.style.setProperty('--npayme__copy-color', copyColor || '#fff');
      document.documentElement.style.setProperty('--widget-card', '#fff');
      document.documentElement.style.setProperty('--widget-contrast', '#1A1A1A');
      document.documentElement.style.setProperty('--widget-contrast-low', '#A64646');
      document.documentElement.style.setProperty('--widget-contrast-high', '#000');

      document.documentElement.style.setProperty('--bg', copyColor || '#f2f4f5');
    }
  }, []);

  useEffect(() => {
    if (w3m === true && modal) {
      setW3m(null);
      modal.open();
    }
  }, [w3m]);

  return (
    <ConnectContext.Provider
      value={{
        address,
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
    throw new Error('useConnectContext must be use withinConnectContextProvider');
  }
  return context;
}
