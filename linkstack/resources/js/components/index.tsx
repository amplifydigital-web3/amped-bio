import React, { useState, createContext, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";

console.log("Starting React App...");

import "./index.css";
import Campaign from "./Campaign";
import Spotify from "./Spotify";
import Web3ConnectButton from "./Connect";
import DashboardStatistics from "./Statistics";
import DashboardRegistrations from "./Registrations";
import DashboardActiveUsers from "./ActiveUsers";
import { addwallet } from "../repository";
import { networks, projectId, wagmiAdapter } from "../config/wagmiConfig";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletProvider, { ConnectModal } from "./connect/main";
import { createAppKit } from "@reown/appkit";
import { AppKitNetwork } from "@reown/appkit/networks";

const metadata = {
  name: "OneLink",
  description: "npayme OneLink",
  url: "onelink.npayme.io",
  icons: [],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks as [AppKitNetwork, ...AppKitNetwork[]],
  defaultNetwork: networks[0],
  metadata: metadata,
  enableCoinbase: true,
  coinbasePreference: "smartWalletOnly",
  featuredWalletIds: [
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // coinbase
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // trustwallet
  ],
  features: {
    swaps: true,
    socials: [
      "google",
      "x",
      "github",
      "discord",
      "apple",
      "facebook",
      "farcaster",
    ],
  },
  // siweConfig: siweConfig,
});

// Setup AppContext
export const AppContext = createContext({});

type CreateContextProviderProps = {
  openModal: any;
  openWeb3Modal: () => void;
  requestSIWE: any;
  children: React.ReactNode;
};

const AppContextProvider = ({
  openModal,
  openWeb3Modal,
  children,
}: CreateContextProviderProps) => {
  return (
    <AppContext.Provider value={{ openModal, openWeb3Modal }}>
      {children}
    </AppContext.Provider>
  );
};

const App = (props: any) => {
  const [open, setOpen] = useState(false);
  const [w3m, setW3m] = useState<boolean | null>(null);
  const [address, setAddress] = useState();
  const [siwe, setSiwe] = useState<any>(null);

  const openModal = useCallback(() => setOpen(true), []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // configure as per your needs
          },
        },
      })
  );

  useEffect(() => {
    window.addEventListener("message", (message) => {
      console.log("message data.........:", message.data);
      console.log("php/js.... origin 1..:", process.env.REWARD_ORIGIN);
      if (message.origin === process.env.REWARD_ORIGIN) {
        switch (message.data.type) {
          case "sign-in@reward":
            setSiwe({
              domain: window.location.host,
              address: address,
              statement: "Sign in to example.com",
              uri: window.location.origin,
              version: "1",
              chainId: 1,
              nonce: "1234556789",
              targets: [],
            });
            break;
          default:
        }
      }
    });
  }, []);

  const onAccountChanged = (data: any) => {
    const { address: update } = data;

    setAddress((prev) => {
      if ((prev && prev != update) || (prev && !update)) {
        console.log("OneLink updates address to......", update);
        setOpen(false);

        const reward = document.getElementById("iframe-npayme-reward");
        if (reward) {
          // @ts-ignore
          reward.contentWindow.postMessage(
            {
              type: update ? "connect" : "disconnect",
              payload: {
                address: update,
              },
            },
            "*"
          );
        }
      }
      return update;
    });

    if (update) {
      addwallet(update);
    }
  };

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider
          openModal={openModal}
          openWeb3Modal={() => setW3m(true)}
          requestSIWE={setSiwe}
        >
          <WalletProvider
            config={{
              modal,
              open,
              setOpen,
              w3m,
              setW3m,
              siwe,
              setSiwe,
            }}
          >
            <ConnectModal modal={modal} open={open} setOpen={setOpen} />
            {props.children}
          </WalletProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const hasConnectComponent = document.getElementById("connect-react");
if (hasConnectComponent) {
  const root = ReactDOM.createRoot(
    document.getElementById("connect-react") as HTMLElement
  );

  root.render(
    <App>
      <Web3ConnectButton />
    </App>
  );
}

const hasSpotifyComponent = document.getElementById("spotify-react");
if (hasSpotifyComponent) {
  const root = ReactDOM.createRoot(
    document.getElementById("spotify-react") as HTMLElement
  );

  root.render(
    <App>
      <Spotify />
    </App>
  );
}

const hasCampaignComponent = document.getElementById("campaign-react");
if (hasCampaignComponent) {
  const root = ReactDOM.createRoot(
    document.getElementById("campaign-react") as HTMLElement
  );

  root.render(
    <App>
      <Campaign />
    </App>
  );
}

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
