import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {HandlerGetListOfContractsResponse} from "../api/Api.ts";
import {api} from "../api";
import {CONTRACTS_MOCK} from "../modules/mock.ts";

interface ContractsState {
    name: string;
    type: string;
    response: HandlerGetListOfContractsResponse
}

export const fetchContracts = createAsyncThunk<ContractsState, { name: string, type: string }>(
    'contracts/fetchContracts',
    async ({name, type}) => {
        try {
            const response = await api.contracts.contractsList({
                contractName: name,
                contractType: type !== '' ? type : undefined
            })
            return {response: response.data, name, type}
        } catch {
            const contracts = CONTRACTS_MOCK.contracts.filter((contract) =>
                contract.name
                    .toLocaleLowerCase()
                    .includes(name.toLocaleLowerCase()) &&
                (type === '' || contract.type === type)
            )

            return {
                response: {
                    contracts
                }, name, type
            }
        }
    },
)

const initialState: ContractsState = {
    name: "",
    type: "",
    response: {}
};

const contracts = createSlice({
    name: "contracts",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setType(state, action: PayloadAction<string>) {
            state.type = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContracts.fulfilled, (_, {payload}) => {
            return payload
        })
    },
});

export const useName = () =>
    useSelector((state: RootState) => state.contracts.name);

export const useType = () =>
    useSelector((state: RootState) => state.contracts.type);

export const useResponse = () =>
    useSelector((state: RootState) => state.contracts.response);

export const {setName, setType} = contracts.actions;

export default contracts.reducer;
