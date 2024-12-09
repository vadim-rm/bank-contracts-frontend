import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/user.ts"
import contractsReducer from "./slices/contracts.ts"
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    contracts: contractsReducer,
    user: userReducer,
});

const store = configureStore({
    reducer: rootReducer
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof rootReducer>;