import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

import ContextProvider from "@npaymelabs/connect";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { mainnet, arbitrum, sepolia } from "wagmi/chains";

console.log("Starting React App...");

import "./index.css";
import Campaign from "./Campaign";
import Spotify from "./Spotify";
import Web3ConnectButton from "./Connect";
import { addwallet } from "../repository";

// 0. Setup queryClient
const queryClient = new QueryClient();

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "64c300c731392456340fe626355b366e";

const chains = [mainnet, sepolia, arbitrum] as const;

// const chains = [mainnet, baseSepolia] as const

const metadata = {
  name: "OneLink",
  description: "npayme OneLink",
  url: "onelink.npayme.io",
  icons: [],
};

export const AppContext = createContext({});

const App = (props: any) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState();

  const connect = () => {
    console.log("web3 wallet connected");
  };

  const onAccountChanged = (data: any) => {
    console.log("onAccountChanged.......", data);
    const { address: wallet } = data;
    if (wallet) {
      setAddress(wallet);
      setOpen(false);

      addwallet(wallet);
    }
  };

  const providerValue = {
    address,
    setAddress,
    setOpen,
  };

  return (
    <ContextProvider
      projectId={projectId}
      metadata={metadata}
      onConnect={connect}
      open={open}
      setOpen={setOpen}
      onAccountChanged={onAccountChanged}
      brandColor="#563AE8"
      copyColor="#FFFFFF"
    >
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={providerValue}>
          {props.children}
        </AppContext.Provider>
      </QueryClientProvider>
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

export default App;
