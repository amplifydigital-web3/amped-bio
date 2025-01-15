import { createContext, useState, type ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { AppKitNetwork } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { networks, projectId, wagmiAdapter } from "../../../config/wagmiConfig";
import { ConnectModal } from "../main";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 2. Create a metadata object - optional
const metadata = {
  name: "OneLink",
  description: "npayme OneLink",
  url: "onelink.npayme.io",
  icons: [],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as [AppKitNetwork, ...AppKitNetwork[]],
  projectId: projectId,
  defaultNetwork: networks[0],
  metadata: metadata,
  //   enableCoinbase: true,
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

export type AppKitContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const AppKitContext = createContext<AppKitContextType | null>(null);

export function AppKitProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AppKitContext.Provider value={{ open, setOpen }}>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ConnectModal modal={modal} open={open} setOpen={setOpen} />
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </AppKitContext.Provider>
  );
}
