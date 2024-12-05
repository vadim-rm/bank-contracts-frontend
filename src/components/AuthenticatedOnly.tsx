import {useIsAuthenticated} from "../slices/user.ts";
import {Navigate, Outlet} from "react-router-dom";

const AuthenticatedOnly = ({children}) => {
    const authenticated = useIsAuthenticated()

    if (!authenticated) {
        return <Navigate to={'/403'} replace/>;
    }

    return children ? children : <Outlet/>;
};

export default AuthenticatedOnly;