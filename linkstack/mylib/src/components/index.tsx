
import React from "react";
import ReactDOM from "react-dom/client";

console.log("Starting React App...");

import "./index.css";
// import Campaign from "./Campaign";
// import Spotify from "./Spotify";
import Web3ConnectButton from "./Connect";
// import DashboardStatistics from "./Statistics";
// import DashboardRegistrations from "./Registrations";
// import DashboardActiveUsers from "./ActiveUsers";
import { AppKitProvider } from "./connect/components/AppKitProvider";


const hasConnectComponent = document.getElementById("connect-react");
if (hasConnectComponent) {
  const root = ReactDOM.createRoot(
    document.getElementById("connect-react") as HTMLElement
  );

  root.render(
    <AppKitProvider>
      <Web3ConnectButton />
    </AppKitProvider>
  );
}

// const hasSpotifyComponent = document.getElementById("spotify-react");
// if (hasSpotifyComponent) {
//   const root = ReactDOM.createRoot(
//     document.getElementById("spotify-react") as HTMLElement
//   );

//   root.render(
//     <AppKitProvider>
//       <Spotify />
//     </AppKitProvider>
//   );
// }

// const hasCampaignComponent = document.getElementById("campaign-react");
// if (hasCampaignComponent) {
//   const root = ReactDOM.createRoot(
//     document.getElementById("campaign-react") as HTMLElement
//   );

//   root.render(
//     <AppKitProvider>
//       <Campaign />
//     </AppKitProvider>
//   );
// }

// const hasStatisticsComponent = document.getElementById("stats-react");
// if (hasStatisticsComponent) {
//   const element = document.getElementById("stats-react") as HTMLElement;
//   const root = ReactDOM.createRoot(element);
//   const data = { ...element.dataset };

//   root.render(
//     <AppKitProvider>
//       <DashboardStatistics stats={data} />
//     </AppKitProvider>
//   );
// }

// const hasRegistrationsComponent = document.getElementById(
//   "registrations-react"
// );
// if (hasRegistrationsComponent) {
//   const element = document.getElementById("registrations-react") as HTMLElement;
//   const root = ReactDOM.createRoot(element);
//   const data = { ...element.dataset };

//   root.render(
//     <AppKitProvider>
//       <DashboardRegistrations registrations={data} />
//     </AppKitProvider>
//   );
// }

// const hasActiveUsersComponent = document.getElementById("activeUsers-react");
// if (hasActiveUsersComponent) {
//   const element = document.getElementById("activeUsers-react") as HTMLElement;
//   const root = ReactDOM.createRoot(element);
//   const data = { ...element.dataset };

//   root.render(
//     <AppKitProvider>
//       <DashboardActiveUsers users={data} />
//     </AppKitProvider>
//   );
// }
