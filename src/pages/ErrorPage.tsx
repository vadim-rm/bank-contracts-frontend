import Layout from "../components/Layout.tsx";
import "./ErrorPage.css";
import {FC} from "react";
import image from "../assets/defaultImage.png";
import {Link} from "react-router-dom";

interface Props {
    code: number
    description: string
}

const ErrorPage: FC<Props> = ({code, description}) => {
    return <Layout>
        <div className="error-row">
            <img src={image} className="error-image"/>
            <div className="error-container">
                <h1>{code}</h1>
                <p>{description}</p>
                <Link to="/" className="button-secondary">Перейти на главную</Link>
            </div>
        </div>
    </Layout>
}

export default ErrorPage