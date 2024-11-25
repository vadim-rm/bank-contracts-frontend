import {FC, FormEvent, useState} from "react";
import Layout from "../components/Layout.tsx";
import {ROUTE_LABELS} from "../Routes.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {Button, Form} from "react-bootstrap";
import "./MePage.css";
import {api} from "../api";

const MePage: FC = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        api.users.usersUpdate({
            password: password,
        }).then(() => {
            setMessage("Пароль успешно изменён")
            setPassword("")
        }).finally(() => setLoading(false))
    }

    return <Layout>
        <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ME}]}/>
        <h1>Профиль</h1>
        {message && <div className="message">{message}</div>}
        <h4>Смена пароля</h4>
        <Form className="me-form" onSubmit={onSubmit}>
            <Form.Group controlId="login">
                <Form.Label>Новый пароль</Form.Label>
                <Form.Control type="password" name="password" placeholder="Введите новый пароль" required
                              value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                className={`button-primary button-compact ${loading && "disabled"}`}
            >
                {loading ? "Загрузка..." : "Сменить пароль"}
            </Button>
        </Form>
    </Layout>
}

export default MePage;