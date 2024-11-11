import {FC} from "react";
import Layout from "../components/Layout.tsx";
import './HomePage.css'
import {Carousel} from "react-bootstrap";

export const HomePage: FC = () => {
    return (
        <Layout className="hero">
            <Carousel className="hero-carousel">
                <Carousel.Item>
                    <img className="hero-image" src="/background-1.jpeg"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="hero-image" src="/background-2.jpeg"/>
                </Carousel.Item>
            </Carousel>
            <div className="hero-text">
                <h1>Добро пожаловать в Банк!</h1>
                <p>
                    В этой системе клиенты могут найти банковские договоры и формировать заявки на открытие счёта в
                    рамках выбранных договоров, которые затем могут быть обработаны сотрудниками банка
                </p>
            </div>
        </Layout>
    );
};