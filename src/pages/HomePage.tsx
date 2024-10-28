import {FC} from "react";
import Layout from "../components/Layout.tsx";
import './HomePage.css'

export const HomePage: FC = () => {
    return (
        <Layout className="hero">
            <div className="hero-text">
                <h1>Добро пожаловать в Банк!</h1>
                <p>
                    В этой системе вы сможете найти все актуальные предложения по нашим договорам
                </p>
            </div>
        </Layout>
    );
};