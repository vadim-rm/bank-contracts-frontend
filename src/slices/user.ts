import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface UserState {
    login?: string;
    isModerator: boolean;
}

const initialState: UserState = {
    isModerator: false
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin(state, action: PayloadAction<string | undefined>) {
            state.login = action.payload;
        },
        setIsModerator(state, action: PayloadAction<boolean>) {
            state.isModerator = action.payload;
        }
    }
});

export const useLogin = () =>
    useSelector((state: RootState) => state.user.login);

export const useIsModerator = () =>
    useSelector((state: RootState) => state.user.isModerator);

export const useIsAuthenticated = () =>
    useSelector((state: RootState) => state.user.login !== undefined);

export const {setLogin, setIsModerator} = user.actions;

export default user.reducer;
