import Card from "../core/Card"

export default function Registrations(props :any) {
  const { registrations = {} } = props;

  return (
    <Card>
        <div className="mb-3 text-gray-800 text-center p-4 w-full">
          <div className='font-weight-bold text-left h3'>Registrations:</div><br></br>
          <div className="d-flex flex-wrap justify-content-around">

              <div className="p-2">
                  <h3 className="text-primary"><strong> { registrations.lastMonthCount } </strong></h3>
                  <span className="text-muted">Last 30 days'</span>
              </div>

              <div className="p-2">
                  <h3 className="text-primary"><strong> { registrations.lastWeekCount } </strong></h3>
                  <span className="text-muted">Last 7 days</span>
              </div>

              <div className="p-2">
                  <h3 className="text-primary"><strong> { registrations.last24HrsCount }</strong></h3>
                  <span className="text-muted">Last 24 hours</span>
              </div>

          </div>
      </div>
    </Card>
        
  );
}
