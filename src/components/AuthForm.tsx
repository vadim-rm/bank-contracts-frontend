import "./AuthForm.css";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ROUTES} from "../Routes.ts";

interface IAuthForm {
    title: string;
    buttonText: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean
}

const AuthForm: React.FC<IAuthForm> = (props) => {
    const {title, buttonText, onSubmit, loading} = props;
    return (
        <div className="auth-form">
            <h2>{title}</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="login">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" name="login" placeholder="Введите логин" required/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Введите пароль" required/>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className={`button-primary button-compact ${loading && "disabled"}`}
                >
                    {loading ? "Загрузка..." : buttonText}
                </Button>
            </Form>
            {title === "Вход" ? (
                <span>
          Ещё нет аккаунта? <Link to={ROUTES.SIGN_UP}>Зарегистрируйтесь</Link>
        </span>
            ) : (
                <span>
          Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войдите</Link>
        </span>
            )}
        </div>
    );
};

export default AuthForm;
