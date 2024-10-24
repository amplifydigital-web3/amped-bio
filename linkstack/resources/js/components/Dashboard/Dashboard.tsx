import Statistics from "./Statistics";
import Registrations from "./Registrations";
import ActiveUsers from "./ActiveUsers";
import Campaign from "../Campaign";
import TopLinks from "./TopLinks";
import { useState } from "react";
import { getRequest } from "../../repository";


export function DashboardTopLinks() {
    const [data, setData] = useState({});
    getRequest('dashboard/data').then(res => setData(res))
  
    return (
      <>
        <TopLinks data={data}/>
        {process.env.ENABLE_PROMOTE === 'true' && (<Campaign />)}
      </>
    );
  }

  export function DashboardAdminStats() {
    const [data, setData] = useState({});
    getRequest('dashboard/data').then(res => setData(res))
  
    return (
      <>
        <Statistics stats={data}/>
        <Registrations registrations={data}/>
        <ActiveUsers users={data}/>
      </>
    );
  }
