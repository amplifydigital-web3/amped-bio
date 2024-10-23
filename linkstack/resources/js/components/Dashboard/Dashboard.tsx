import Statistics from "./Statistics";
import Registrations from "./Registrations";
import ActiveUsers from "./ActiveUsers";
import Campaign from "../Campaign";
import TopLinks from "./TopLinks";


export default function DashboardActiveUsers(props :any) {
    const { data } = props;
  
    return (
      <>
        {/* <TopLinks data={data}/> */}
        {process.env.ENABLE_PROMOTE === 'true' && (<Campaign />)}
        <Statistics stats={data}/>
        <Registrations registrations={data}/>
        <ActiveUsers users={data}/>
      </>
    );
  }
