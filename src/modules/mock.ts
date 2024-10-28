import {GetContractsResult} from "./contractsApi.ts";
import image from "../assets/defaultImage.png"

export const CONTRACTS_MOCK: GetContractsResult = {
    contracts: [
        {
            id: 2,
            name: "Расчётный счёт",
            fee: 350,
            description: "Договор для выполнения расчётов с другими организациями",
            imageUrl: String(image),
            type: "account"
        },
        {
            id: 4,
            name: "Эквайринг с терминалом для малого бизнеса",
            fee: 1000,
            description: "Договор для принятия платежей оффлайн",
            imageUrl: String(image),
            type: "acquiring"
        },
    ]
};