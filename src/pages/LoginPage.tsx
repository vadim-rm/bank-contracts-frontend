import AuthForm from "../components/AuthForm";
import Layout from "../components/Layout";
import {api} from "../api";
import {ROUTES} from "../Routes.ts";
import {useNavigate} from "react-router-dom";
import {useAsyncError} from "../api/useAsyncError.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setIsModerator, setLogin} from "../slices/user.ts";

const LoginPage = () => {
    const navigate = useNavigate();
    const throwError = useAsyncError();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target! as HTMLFormElement);
        const {login, password} = Object.fromEntries(formData.entries());
        setLoading(true);
        api.users.loginCreate({
            login: login as string,
            password: password as string,
        }).then((r) => {
            localStorage.setItem("token", r.data.accessToken!);

            dispatch(setLogin(r.data.login!));
            dispatch(setIsModerator(r.data.isModerator!));

            navigate(ROUTES.HOME)
            setLoading(false);
        }).catch((r) => {
            throwError(r)
            setLoading(false);
        });
    };

    return (
        <Layout className="auth-page">
            <AuthForm title="Вход" buttonText="Войти" onSubmit={handleSubmit} loading={loading}/>
        </Layout>
    );
};

export default LoginPage;
