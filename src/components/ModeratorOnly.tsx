import {useIsModerator} from "../slices/user.ts";
import {Navigate, Outlet} from "react-router-dom";
import {FC, ReactNode} from "react";

interface Props {
    children?: ReactNode
}

const ModeratorOnly: FC<Props> = ({children}) => {
    const isModerator = useIsModerator()

    if (!isModerator) {
        return <Navigate to={'/403'} replace/>;
    }

    return children ? children : <Outlet/>;
};

export default ModeratorOnly;