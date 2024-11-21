'use client';

import { useEffect, useState, createContext } from 'react';
// import { signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import { AddressType } from '@npaymelabs/connect';
import { AddressType, useConnectContext } from '../lib/connect/main';
import { useWeb3ModalEvents } from '@web3modal/wagmi/react';

import { useAccount, useSignMessage } from 'wagmi';

type CreateContextProviderProps = {
  openModal: () => void;
  closeModal: () => void;
  openWeb3Modal: () => void;
  requestSIWE: any;
  created?: boolean;
  children: React.ReactNode;
};

export const AppContext = createContext({});

export default function AppProvider({
  openModal,
  closeModal,
  openWeb3Modal,
  requestSIWE,
  created,
  children,
}: CreateContextProviderProps) {
  // const { pathname, push } = useRouter();
  // const notProgramme = !pathname.includes('/programme');
  // @ts-ignore
  const { signMessageAsync } = useConnectContext(); // ConnectContext;
  const { address: update, isConnected, status } = useAccount();
  // const { signMessageAsync } = useSignMessage();

  // const { status: sessionStatus } = useSession();
  let sessionStatus = '';
  console.log('update, status, sessionStatus', update, status, sessionStatus);
  if (created) {
    console.log('Newly created smart wallet: ', update);
  }

  const [address, setAddress] = useState<AddressType>();

  const [inpage, setInpage] = useState(false);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      // console.log('event origin:', event.origin);
      // if (event.data) {
      //   console.log('event.data', event.data?.data);
      // }

      if (event.origin === process.env.NEXT_PUBLIC_ONELINK_ORIGIN) {
        switch (event.data.type) {
          case 'ping':
            setInpage(true);
            window?.top?.postMessage({ type: 'pong' }, '*');
            break;
          case 'connect':
            onAccountChanged({
              address: event.data.payload.address,
            });

            // send sign in request to main website
            // ...

            break;
          case 'disconnect':
            onAccountChanged({
              address: '',
            });
            break;
          default:
        }
      }
    });
  }, []);

  const events = useWeb3ModalEvents();
  console.log('web3modal events:', events.data);

  useEffect(() => {
    if (status === 'disconnected' && sessionStatus == 'authenticated') {
      // signOut();
    }

    if (status === 'disconnected') {
      console.log('unset address...................');
      setAddress(undefined);
    }
  }, [status, sessionStatus]);

  useEffect(() => {
    setAddress(update);

    // if (notProgramme && (sessionStatus === 'unauthenticated' || !update)) {
    //   push('/auth/sign-in');
    // } else if (notProgramme && sessionStatus === 'authenticated') {
    //   push('/dashboard');
    // }
    // if (!update && sessionStatus === 'authenticated') {
    //   signOut();
    // }
  }, [update, sessionStatus]);

  const onAccountChanged = (data: any) => {
    const { address: update, status } = data;
    // if (update && update !== address) {
    //   alert(`Update address to......${update}`);
    //   setAddress(update);
    //   setOpen(false);
    //   // console.log('Now read participaent with business', business);
    //   // if (business?.domain) {
    //   //   makeApiRequest({
    //   //     url: `/api/participants`,
    //   //     method: 'POST',
    //   //     body: {
    //   //       address,
    //   //       domain: business.domain,
    //   //     },
    //   //   })
    //   //     .then((participant: ProgramExtendedParticipant) => setParticipant(participant))
    //   //     .catch(() => console.log('error'));
    //   // }

    //   if (notProgramme && /*status === 'unauthenticated' ||*/ !update) {
    //     alert(`address......${address}, update: ${update}`);
    //     push('/auth/sign-in');
    //   } else if (notProgramme && status === 'disconnected') {
    //     push('/auth/sign-in');
    //   }
    // }

    setAddress((prev: any) => {
      if ((prev && prev != update) || (prev && !update)) {
        console.log('@Loyalty Updates address to......', update);
        closeModal();

        // if (notProgramme && /*status === 'unauthenticated' ||*/ !update) {
        //   push('/auth/sign-in');
        // } else if (notProgramme && status === 'disconnected') {
        //   push('/auth/sign-in');
        // }
      }
      return update;
    });

    if (status === 'disconnected') {
      setAddress(undefined);
      // push('/auth/sign-in');
    }
  };

  return (
    <AppContext.Provider
      value={{
        inpage,
        address,
        setAddress,
        openModal,
        openWeb3Modal,
        requestSIWE: inpage ? requestSIWE : signMessageAsync,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
