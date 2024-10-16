import Card from "./core/Card"

export default function DashboardActiveUsers(props) {
  const { users } = props;

  return (
    <Card>
        <div className="mb-3 text-gray-800 text-center p-4 w-full">
          <div className='font-weight-bold text-left h3'>Active Users:</div><br></br>
          <div className="d-flex flex-wrap justify-content-around">

              <div className="p-2">
                  <h3 className="text-primary"><strong> { users.updatedLast30DaysCount } </strong></h3>
                  <span className="text-muted">Last 30 days'</span>
              </div>

              <div className="p-2">
                  <h3 className="text-primary"><strong> { users.updatedLast7DaysCount } </strong></h3>
                  <span className="text-muted">Last 7 days</span>
              </div>

              <div className="p-2">
                  <h3 className="text-primary"><strong> { users.updatedLast24HrsCount }</strong></h3>
                  <span className="text-muted">Last 24 hours</span>
              </div>

          </div>
      </div>
    </Card>
        
  );
}
