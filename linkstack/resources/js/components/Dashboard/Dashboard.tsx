import Statistics from "./Statistics";
import Registrations from "./Registrations";
import ActiveUsers from "./ActiveUsers";
import Campaign from "../Campaign";
import TopLinks from "./TopLinks";
import useFetch from "../../repository/sendRequest";


export function DashboardTopLinks() {
    const {data, loading, error} = useFetch('get', 'dashboard/data');

    if (error) {
      console.log(error);
    }

    return (
      <>
        <TopLinks data={data} loading={loading}/>
        {process.env.ENABLE_PROMOTE === 'true' && (<Campaign />)}
      </>
    );
  }

  export function DashboardAdminStats() {
    const {data, loading, error} = useFetch('get', 'dashboard/data');

    if (error) {
      console.log(error);
    }

    return (
      <>
        <Statistics stats={data} loading={loading}/>
        <Registrations registrations={data} loading={loading}/>
        <ActiveUsers users={data} loading={loading}/>
      </>
    );
  }
