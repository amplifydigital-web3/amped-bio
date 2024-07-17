import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { mainnet, arbitrum, sepolia } from "wagmi/chains";
// import { useAccount, useDisconnect } from "wagmi";

import { WagmiProvider } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
// import { cookieStorage, createStorage, cookieToInitialState } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import "./index.css";

// declare global {
//     interface Window {
//         ethereum?: any;
//     }
// }

const queryClient = new QueryClient();
export const projectId = (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
    "64c300c731392456340fe626355b366e") as string;
console.log("projectId:", projectId);
// mainnet.rpcUrls.default.http.push ('https://eth-goerli.g.alchemy.com/v2/zq6RjOuZ3l1xLNtY__7JlVqMKS5swDYI');
const chains = [mainnet, sepolia, arbitrum] as const;
console.log("chains...:", mainnet.rpcUrls);
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

const Hello = () => {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <w3m-button label="Connect Wallet"></w3m-button>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

if (document.getElementById("hello-react")) {
    const root = ReactDOM.createRoot(
        document.getElementById("hello-react") as HTMLElement
    );
    root.render(<Hello />);
}

export default Hello;
