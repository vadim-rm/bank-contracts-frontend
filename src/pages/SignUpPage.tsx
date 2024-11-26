import AuthForm from "../components/AuthForm";
import Layout from "../components/Layout";
import {FormEvent, useState} from "react";
import {api} from "../api";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../Routes.ts";
import {useAsyncError} from "../api/useAsyncError.ts";
import background from "../assets/background.jpeg";

const SignUpPage = () => {
    const navigate = useNavigate();
    const throwError = useAsyncError();
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target! as HTMLFormElement);
        const {login, password} = Object.fromEntries(formData.entries());

        setLoading(true);
        api.users.usersCreate({
            login: login as string,
            password: password as string,
        }).then(() => {
            navigate(ROUTES.LOGIN)
            setLoading(false);
        }).catch((r) => {
            throwError(r);
            setLoading(false);
        });
    };

    return (
        <Layout className="auth-page" style={{backgroundImage: `url(${background})`}}>
            <AuthForm
                title="Регистрация"
                buttonText="Зарегистрироваться"
                onSubmit={handleSubmit}
                loading={loading}
            />
        </Layout>
    );
};

export default SignUpPage;
