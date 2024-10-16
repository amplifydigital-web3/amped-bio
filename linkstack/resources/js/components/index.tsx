import React, { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

// @ts-ignore
import ContextProvider from "@npaymelabs/connect";
import { QueryClient } from "@tanstack/react-query";
import { mainnet, arbitrum, sepolia } from "wagmi/chains";

console.log("Starting React App...");

import "./index.css";
import Campaign from "./Campaign";
import Spotify from "./Spotify";
import Web3ConnectButton from "./Connect";
import DashboardStatistics from "./Statistics";
import DashboardRegistrations from "./Registrations";
import DashboardActiveUsers from "./ActiveUsers";
import { addwallet } from "../repository";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  "64c300c731392456340fe626355b366e";

const chains = [mainnet, sepolia, arbitrum] as const;

const metadata = {
  name: "OneLink",
  description: "npayme OneLink",
  url: "onelink.npayme.io",
  icons: [],
};

// Setup queryClient
const queryClient = new QueryClient();

// Setup AppContext
export const AppContext = createContext({});

type CreateContextProviderProps = {
  address: string | undefined;
  setAddress: any;
  openModal: any;
  openWeb3Modal: any;
  requestSIWE: any;
  children: React.ReactNode;
};

const AppContextProvider = ({
  address,
  setAddress,
  openModal,
  openWeb3Modal,
  children,
}: CreateContextProviderProps) => {
  return (
    <AppContext.Provider
      value={{ address, setAddress, openModal, openWeb3Modal }}
    >
      {children}
    </AppContext.Provider>
  );
};

const App = (props: any) => {
  const [open, setOpen] = useState(false);
  const [w3m, setW3m] = useState<boolean | null>(null);
  const [address, setAddress] = useState();
  const [siwe, setSiwe] = useState<any>(null);

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
    <ContextProvider
      config={{
        projectId,
        metadata,
        open,
        setOpen,
        close,
        w3m,
        setW3m,
        onAccountChanged,
        siwe,
        setSiwe,
        brandColor: "#563AE8",
        copyColor: "#FFFFFF",
      }}
    >
      <AppContextProvider
        address={address}
        setAddress={setAddress}
        openModal={() => setOpen(true)}
        openWeb3Modal={() => setW3m(true)}
        requestSIWE={setSiwe}
      >
        {props.children}
      </AppContextProvider>
    </ContextProvider>
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
  const data = {...element.dataset};

  root.render(
    <App>
      <DashboardStatistics stats={data} />
    </App>
  );
}

const hasRegistrationsComponent = document.getElementById("registrations-react");
if (hasRegistrationsComponent) {
  const element = document.getElementById("registrations-react") as HTMLElement;
  const root = ReactDOM.createRoot(element);
  const data = {...element.dataset};

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
  const data = {...element.dataset};

  root.render(
    <App>
      <DashboardActiveUsers users={data} />
    </App>
  );
}

export default App;
