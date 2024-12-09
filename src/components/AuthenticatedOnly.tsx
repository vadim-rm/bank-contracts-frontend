import {useIsAuthenticated} from "../slices/user.ts";
import {Navigate, Outlet} from "react-router-dom";
import {FC, ReactNode} from "react";

interface Props {
    children?: ReactNode
}

const AuthenticatedOnly: FC<Props> = ({children}) => {
    const authenticated = useIsAuthenticated()

    if (!authenticated) {
        return <Navigate to={'/403'} replace/>;
    }

    return children ? children : <Outlet/>;
};

export default AuthenticatedOnly;