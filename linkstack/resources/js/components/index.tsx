import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { mainnet, arbitrum, sepolia } from "wagmi/chains";

import { WagmiProvider } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
// import { cookieStorage, createStorage, cookieToInitialState } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import "./index.css";
import Campaign from "./Campaign";
import Spotify from "./Spotify";
import Connect from "./Connect";

const queryClient = new QueryClient();
export const projectId = (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  "64c300c731392456340fe626355b366e") as string;
const chains = [mainnet, sepolia, arbitrum] as const;
const metadata = {
  name: "npayme reward",
  description: "npayme loyalty program toolkit",
  url: process.env.REWARD_URL || "", // origin must match your domain & subdomain
  icons: [],
};

const wagmiConfig = defaultWagmiConfig({
  chains,
  // connectors: w3mConnectors({ chains, projectId }),
  projectId,
  metadata,
  ssr: true,
  enableInjected: true,
  // enableWalletConnect: true,
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
});

const web3Modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#00DCFF",
    "--w3m-color-mix-strength": 20,
  },
  // allWallets: 'ONLY_MOBILE',
});

const App = (props: any) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {props.children}
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
      <Connect />
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
