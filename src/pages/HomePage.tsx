import {FC} from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "../Routes.ts";
import {Button, Col, Row} from "react-bootstrap";
import Layout from "../components/Layout.tsx";

export const HomePage: FC = () => {
    return (
        <Layout>
            <Row>
                <Col md={6}>
                    <h1>Добро пожаловать в Банк!</h1>
                    <p>
                        В этой системе вы сможете найти все актуальные предложения по нашим договорам
                    </p>
                    <Link to={ROUTES.CONTRACTS}>
                        <Button variant="primary">Просмотреть</Button>
                    </Link>
                </Col>
            </Row>
        </Layout>
    );
};