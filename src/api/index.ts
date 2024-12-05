import {Api} from "./Api.ts";

const api = new Api({
    baseURL: "http://localhost:3000/api",
})

const UNAUTHORIZED = "UNAUTHORIZED";

const errorsToString: { [key: string]: string } = {
    "ERR_INVALID_CREDENTIALS": "Неверный логин или пароль",
    "ERR_ACCOUNT_NUMBER_EMPTY": "Не заполнен номер счёта",
    "UNAUTHORIZED": "Доступ запрещен",
}

api.instance.interceptors.response.use(r => r, (error) => {
    let errorCode = error.response.data.error
    if (error.response.status === 403) {
        errorCode = UNAUTHORIZED
    }
    const errorMessage = errorsToString[errorCode] ?? `Произошла неизвестная ошибка ${error.response.data.error}`;
    throw new Error(errorMessage);
});

api.instance.interceptors.request.use(r => {
    const token = localStorage.getItem('token');
    if (token) {
        r.headers['Authorization'] = `Bearer ${token}`;
    }

    return r;
});

export {api};