import Card from "../core/Card"

export default function Statistics(props :any) {
  const { stats = {}, loading } = props;

  return (
    <Card>
        <div className="mb-3 text-gray-800 text-center p-4 w-full">
            <div className='font-weight-bold text-left h3'>Site Statistics:</div><br></br>
            <div className="d-flex flex-wrap justify-content-around">

                <div className="p-2">
                    <h3 className="text-primary"><strong><i className="bi bi-share-fill"> {loading && 'LOADING'}{!loading && stats.siteLinks }  </i></strong></h3>
                    <span className="text-muted">Total links</span>
                </div>

                <div className="p-2">
                    <h3 className="text-primary"><strong><i className="bi bi-eye-fill"> { stats.siteClicks } </i></strong></h3>
                    <span className="text-muted">Total clicks</span>
                </div>

                <div className="p-2">
                    <h3 className="text-primary"><strong><i className="bi bi bi-person-fill"> { stats.userNumber }</i></strong></h3>
                    <span className="text-muted">Total users</span>
                </div>

            </div>
        </div>
    </Card>
        
  );
}
