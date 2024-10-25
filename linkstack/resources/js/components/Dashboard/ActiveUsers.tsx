import Card from "../core/Card"
import Spinner from "../core/Spinner";


export default function ActiveUsers(props :any) {
  const { users = {}, loading } = props;

  return (
    <Card>
        <div className="mb-3 text-gray-800 text-center p-4 w-full">
          <div className='font-weight-bold text-left h3'>Active Users:</div><br></br>
          <div className="d-flex flex-wrap justify-content-around">

              <div className="p-2">
                <h3 className="text-primary">
                  <strong>
                    <Spinner loading={loading}>{ users.updatedLast30DaysCount }</Spinner>
                  </strong>
                </h3>
                <span className="text-muted">Last 30 days'</span>
              </div>

              <div className="p-2">
                <h3 className="text-primary">
                  <strong>
                    <Spinner loading={loading}>{ users.updatedLast7DaysCount }</Spinner>
                  </strong>
                </h3>
                <span className="text-muted">Last 7 days</span>
              </div>

              <div className="p-2">
                <h3 className="text-primary">
                  <strong>
                    <Spinner loading={loading}>{ users.updatedLast24HrsCount }</Spinner>
                  </strong>
                </h3>
                <span className="text-muted">Last 24 hours</span>
              </div>

          </div>
      </div>
    </Card>
        
  );
}
