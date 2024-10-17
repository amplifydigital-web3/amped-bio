import Statistics from "./Statistics";
import Registrations from "./Registrations";
import ActiveUsers from "./ActiveUsers";

export default function DashboardActiveUsers(props :any) {
    const { data } = props;
  
    return (
      <>
        <Statistics stats={data}/>
        <Registrations registrations={data}/>
        <ActiveUsers users={data}/>
      </>
    );
  }