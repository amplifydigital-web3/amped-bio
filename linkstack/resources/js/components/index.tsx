// @ts-nocheck

import React, { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

// import { WagmiProvider } from "wagmi";
// import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
// import { createWeb3Modal, useWeb3ModalEvents } from "@web3modal/wagmi/react";
// import { mainnet, sepolia, polygon, baseSepolia } from "wagmi/chains";
// import {
//   QueryClientContext,
//   QueryClientProvider,
//   QueryClient,
// } from "@tanstack/react-query/build/legacy/index.js";
// import { ConnectModal } from "../lib/connect/main";

// @ts-ignore
// import ContextProvider from "@npaymelabs/connect";
// import WalletProvider from "../lib/connect/main";
// import { lazy } from "react";

// import WalletProvider from "../lib/connect/components/connect";
// import { QueryClient } from "@tanstack/react-query";
// import { mainnet, arbitrum, sepolia } from "wagmi/chains";

console.log("Starting React App...");

import "./index.css";
import Campaign from "./Campaign";
import Spotify from "./Spotify";
import Web3ConnectButton from "./ConnectButton";
import DashboardStatistics from "./Statistics";
import DashboardRegistrations from "./Registrations";
import DashboardActiveUsers from "./ActiveUsers";
import { addwallet } from "../repository";

import { Provider } from "../providers";
// const WagmiProvider = lazy(() => import("../lib/connect/main"));
// const queryClient = new QueryClient();

// export const projectId = (process.env.WALLETCONNECT_PROJECT_ID ||
//   "64c300c731392456340fe626355b366e") as string;

// const chains = [mainnet, sepolia, polygon, baseSepolia] as const;

// const metadata = {
//   name: "OneLink",
//   description: "npayme OneLink",
//   url: "onelink.npayme.io", // origin must match your domain & subdomain
//   icons: [],
// };

// const wagmiConfig = defaultWagmiConfig({
//   chains,
//   projectId,
//   metadata,
//   auth: {
//     email: true, // default to true
//     socials: [
//       "google",
//       "x",
//       "github",
//       "discord",
//       "apple",
//       "facebook",
//       "farcaster",
//     ],
//     showWallets: true, // default to true
//     walletFeatures: true, // default to true
//   },
//   ssr: false,
//   enableInjected: true,
// });

// const modal = createWeb3Modal({
//   wagmiConfig,
//   projectId,
//   themeMode: "light",
//   // defaultChain: mainnet,
//   // allWallets: 'ONLY_MOBILE',
//   excludeWalletIds: [],
//   enableSwaps: true, // Optional - true by default
//   themeVariables: {
//     "--w3m-color-mix": "#00DCFF",
//     "--w3m-color-mix-strength": 20,
//   },
// });

// // Setup AppContext
// export const AppContext = createContext({});

// type CreateContextProviderProps = {
//   address: string | undefined;
//   setAddress: any;
//   openModal: any;
//   openWeb3Modal: any;
//   requestSIWE: any;
//   children: React.ReactNode;
// };

// const AppContextProvider = ({
//   address,
//   setAddress,
//   openModal,
//   openWeb3Modal,
//   children,
// }: CreateContextProviderProps) => {
//   return (
//     <AppContext.Provider
//       value={{ address, setAddress, openModal, openWeb3Modal }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // const App = (props: any) => {
// const App = React.memo((props: any) => {
//   const [open, setOpen] = useState(false);
//   const [w3m, setW3m] = useState<boolean | null>(null);
//   const [address, setAddress] = useState();
//   const [siwe, setSiwe] = useState<any>(null);

//   useEffect(() => {
//     window.addEventListener("message", (message) => {
//       console.log("message data.........:", message.data);
//       console.log("php/js.... origin 1..:", process.env.REWARD_ORIGIN);
//       if (message.origin === process.env.REWARD_ORIGIN) {
//         switch (message.data.type) {
//           case "sign-in@reward":
//             setSiwe({
//               domain: window.location.host,
//               address: address,
//               statement: "Sign in to example.com",
//               uri: window.location.origin,
//               version: "1",
//               chainId: 1,
//               nonce: "1234556789",
//               targets: [],
//             });
//             break;
//           default:
//         }
//       }
//     });
//   }, []);

//   // const [queryClient] = useState(
//   //   () =>
//   //     new QueryClient({
//   //       defaultOptions: {
//   //         queries: {
//   //           refetchOnWindowFocus: false, // configure as per your needs
//   //         },
//   //       },
//   //     })
//   // );

//   const onAccountChanged = (data: any) => {
//     const { address: update } = data;

//     setAddress((prev) => {
//       if ((prev && prev != update) || (prev && !update)) {
//         console.log("OneLink updates address to......", update);
//         setOpen(false);

//         const reward = document.getElementById("iframe-npayme-reward");
//         if (reward) {
//           // @ts-ignore
//           reward.contentWindow.postMessage(
//             {
//               type: update ? "connect" : "disconnect",
//               payload: {
//                 address: update,
//               },
//             },
//             "*"
//           );
//         }
//       }
//       return update;
//     });

//     if (update) {
//       addwallet(update);
//     }
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <WagmiProvider config={wagmiConfig}>
//         <WalletProvider
//           config={{
//             queryClient,
//             modal,
//             open,
//             setOpen,
//             w3m,
//             setW3m,
//             siwe,
//             setSiwe,
//             brandColor: "#563AE8",
//             copyColor: "#FFFFFF",
//           }}
//         >
//           <AppContextProvider
//             address={address}
//             setAddress={setAddress}
//             openModal={() => setOpen(true)}
//             openWeb3Modal={() => setW3m(true)}
//             requestSIWE={setSiwe}
//           >
//             <ConnectModal modal={modal} open={open} setOpen={setOpen} />
//             {props.children}
//           </AppContextProvider>
//         </WalletProvider>
//       </WagmiProvider>
//     </QueryClientProvider>
//   );
// });
// // };
const App = (props: any) => {
  return <Provider>{props.children}</Provider>;
};

const hasConnectComponent = document.getElementById("connect-react");
if (hasConnectComponent) {
  console.log("starting.....................");
  const root = ReactDOM.createRoot(
    document.getElementById("connect-react") as HTMLElement
  );

  root.render(
    <App>
      <Web3ConnectButton />
    </App>
  );
}

// const hasSpotifyComponent = document.getElementById("spotify-react");
// if (hasSpotifyComponent) {
//   const root = ReactDOM.createRoot(
//     document.getElementById("spotify-react") as HTMLElement
//   );

//   root.render(
//     <App>
//       <Spotify />
//     </App>
//   );
// }

// const hasCampaignComponent = document.getElementById("campaign-react");
// if (hasCampaignComponent) {
//   const root = ReactDOM.createRoot(
//     document.getElementById("campaign-react") as HTMLElement
//   );

//   root.render(
//     <App>
//       <Campaign />
//     </App>
//   );
// }

const hasStatisticsComponent = document.getElementById("stats-react");
if (hasStatisticsComponent) {
  const element = document.getElementById("stats-react") as HTMLElement;
  const root = ReactDOM.createRoot(element);
  const data = { ...element.dataset };

  root.render(
    <App>
      <DashboardStatistics stats={data} />
    </App>
  );
}

const hasRegistrationsComponent = document.getElementById(
  "registrations-react"
);
if (hasRegistrationsComponent) {
  const element = document.getElementById("registrations-react") as HTMLElement;
  const root = ReactDOM.createRoot(element);
  const data = { ...element.dataset };

  root.render(
    <App>
      <DashboardRegistrations registrations={data} />
    </App>
  );
}

const hasActiveUsersComponent = document.getElementById("activeUsers-react");
if (hasActiveUsersComponent) {
  const element = document.getElementById("activeUsers-react") as HTMLElement;
  const root = ReactDOM.createRoot(element);
  const data = { ...element.dataset };

  root.render(
    <App>
      <DashboardActiveUsers users={data} />
    </App>
  );
}

export default App;
