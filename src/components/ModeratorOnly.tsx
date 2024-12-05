import {useIsModerator} from "../slices/user.ts";
import {Navigate, Outlet} from "react-router-dom";

const ModeratorOnly = ({children}) => {
    const isModerator = useIsModerator()

    if (!isModerator) {
        return <Navigate to={'/403'} replace/>;
    }

    return children ? children : <Outlet/>;
};

export default ModeratorOnly;