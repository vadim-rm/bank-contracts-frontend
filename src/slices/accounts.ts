import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api} from "../api";
import {HandlerGetAccountsListAccount} from "../api/Api.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";

interface AccountsState {
    accounts: HandlerGetAccountsListAccount[];
    status: string;
    loading: boolean;
    startDate: string | null;
    endDate: string | null;
    creator: string;
}

const initialState: AccountsState = {
    accounts: [],
    status: "any",
    loading: true,
    startDate: null,
    endDate: null,
    creator: "",
};

const validateDate = (date: string) => {
    const parts = date.split("-");
    return parts && parts.length === 3 && parts[0].length === 4 && parts[1].length === 2 && parts[2].length === 2
}

export const fetchAccounts = createAsyncThunk<HandlerGetAccountsListAccount[], void>(
    "accounts/fetchAccounts",
    async (_, {getState}) => {
        const state = getState();

        let props: { from?: string, to?: string } = {};
        if (state.accounts.startDate && validateDate(state.accounts.startDate))
            props = {from: new Date(state.accounts.startDate).toISOString()}
        if (state.accounts.endDate && validateDate(state.accounts.endDate))
            props = {...props, to: new Date(state.accounts.endDate).toISOString()}

        const response = await api.accounts.accountsList({
            status: state.accounts.status === "any" ? undefined : state.accounts.status,
            ...props
        });
        return response.data.accounts!;
    }
);

export const updateAccountStatus = createAsyncThunk<void, { id: number; status: string }>(
    "accounts/updateAccountStatus",
    async ({id, status}: { id: number; status: string }, {dispatch}) => {
        await api.accounts.completeUpdate(id, {status});
        dispatch(fetchAccounts()); // Refresh accounts
    }
);

const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload;
        },
        setStartDate(state, action: PayloadAction<string | null>) {
            state.startDate = action.payload;
        },
        setEndDate(state, action: PayloadAction<string | null>) {
            state.endDate = action.payload;
        },
        setCreator(state, action: PayloadAction<string>) {
            state.creator = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.accounts = action.payload;
                state.loading = false;
            })
            .addCase(fetchAccounts.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const useAccounts = () =>
    useSelector((state: RootState) => state.accounts);

export const {setStatus, setStartDate, setEndDate, setCreator} = accountsSlice.actions;
export default accountsSlice.reducer;
