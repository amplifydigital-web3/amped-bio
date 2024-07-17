import React from "react";
import ReactDOM from "react-dom/client";

import Viewer from "@knowins/viewer";

const Spotify = () => {
    return (
        <Viewer
            config={{
                title: "",
                account: "0x019bbe745b5c9b70060408Bf720B1E5172EEa5A3",
                command:
                    'REPORT(QUERY_DB({"from":"","select":[],"where":[{"node":"raw_param_filter","name":"Parameter","alias":"","datatype":"","filterfrom":"ArtistID","filterto":"6apPlIGZh3rWyCUCqwNYXG","isnot":"N","operator":"Parameter"}]},TEST_SPOTIFY))',
                toolbar: { show: false },
            }}
            backgroundColor="#222738"
            // @ts-ignore
            loading={null}
        />
    );
};

console.log("Run spotify....................");
if (document.getElementById("spotify-react")) {
    console.log("Spotify did run ....................");
    const root = ReactDOM.createRoot(
        document.getElementById("spotify-react") as HTMLElement
    );
    root.render(<Spotify />);
}

export default Spotify;
