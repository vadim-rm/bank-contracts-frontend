export const ROUTES = {
    HOME: "/",
    CONTRACTS: "/contracts",
    LOGIN: "/login",
    SIGN_UP: "/sign-up",
    ACCOUNTS: "/accounts",
    ME: "/me",
};
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
    HOME: "Главная",
    CONTRACTS: "Договоры",
    LOGIN: "Вход",
    SIGN_UP: "Регистрация",
    ACCOUNTS: "Заявки на счета",
    ME: "Профиль",
};
