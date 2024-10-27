import {GetContractsResult} from "./contractsApi.ts";

export const CONTRACTS_MOCK: GetContractsResult = {
    contracts: [
        {
            id: 2,
            name: "Расчётный счёт",
            fee: 350,
            description: "Договор для выполнения расчётов с другими организациями",
            imageUrl: "http://localhost:9000/main/2",
            type: "account"
        },
        {
            id: 4,
            name: "Эквайринг с терминалом для малого бизнеса",
            fee: 1000,
            description: "Договор для принятия платежей оффлайн",
            imageUrl: "http://localhost:9000/main/4",
            type: "acquiring"
        },
    ]
};