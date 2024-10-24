import Card from "../core/Card"
import Spotify from "../Spotify";

function renderLink(link :any) {
    // TODO: figure out why I need these checks
    if (link.name === 'phone' || link.name === 'heading' || link.button_id === 96) {
        return null;
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto text-truncate">
                <div className="fw-bold text-truncate">{link.title}</div>
                {link.link} - {link.name}
            </div>
            <span className="badge bg-primary rounded-pill p-2">{link.click_number} - {'clicks'}</span>
            {process.env.ENABLE_SPOTIFY === 'true' && link.title === "Spotify" && (
                <Spotify />
            )}
        </li>
    );
}

export default function TopLinks(props :any) {
    const { data = {} } = props;

    return (
        <Card>
            <h3 className="mb-4"><i className="bi bi-menu-up"></i>{' Dashboard'}</h3>
            <div className="mb-3 text-center p-4 w-full">
                <div className=" d-flex">
                    <div className='p-2 h6'><i className="bi bi-link"></i>{'Total Links: '}<span className='text-primary'>{data.links} </span></div>
                    <div className='p-2 h6'><i className="bi bi-eye"></i> {'Link Clicks:'} <span className='text-primary'>{data.clicks}</span></div>
                </div>
                <div className='text-center w-100'>
                    <a href="{{ url('/studio/links') }}">{'View/Edit Links'}</a>
                </div>
                <div className='w-100 text-left'>
                    <h6><i className="bi bi-sort-up"></i> {'Top Links:'}</h6>
                    <div className="bd-example" >
                        <ol className="list-group list-group-numbered" style={{textAlign: 'left'}}>
                            {data.topLinks?.length === 0 && (
                                <div className="container">
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-6 text-center">
                                            <p className="p-2">{'You haven’t added any links yet'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {data.topLinks?.length >= 0 && (
                                <>
                                    {data.topLinks?.map((link: any) => renderLink(link))}
                                </>
                            )}
                        </ol>
                    </div>
                </div>
            </div>
        </Card>
    );
}
