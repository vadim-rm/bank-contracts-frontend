import "./BreadCrumbs.css";
import {FC, Fragment} from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "../Routes.ts";

interface ICrumb {
    label: string;
    path?: string;
}

interface BreadCrumbsProps {
    crumbs: ICrumb[];
}

export const BreadCrumbs: FC<BreadCrumbsProps> = (props) => {
    const {crumbs} = props;

    return (
        <ul className="breadcrumbs">
            <li>
                <Link to={ROUTES.HOME}>Главная</Link>
            </li>
            {!!crumbs.length &&
                crumbs.map((crumb, index) => (
                    <Fragment key={index}>
                        <li className="slash">/</li>
                        {index === crumbs.length - 1 ? (
                            <li>{crumb.label}</li>
                        ) : (
                            <li>
                                <Link to={crumb.path || ""}>{crumb.label}</Link>
                            </li>
                        )}
                    </Fragment>
                ))}
        </ul>
    );
};