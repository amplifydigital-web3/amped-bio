import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    loading: boolean
}

export default function Spinner(props :Props) {
    const {loading, children} = props;
    return (
        <>
            {loading && (
                <>
                    ...
                </>
            )}
            {!loading && children}
        </>
    );
}