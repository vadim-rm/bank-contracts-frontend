export const ROUTES = {
    HOME: "/",
    CONTRACTS: "/contracts",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
    HOME: "Главная",
    CONTRACTS: "Договоры",
};