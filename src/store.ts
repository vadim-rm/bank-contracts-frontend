import {combineReducers, configureStore} from "@reduxjs/toolkit"
import filtersReducer from "./slices/filters.ts"
import userReducer from "./slices/user.ts"


const rootReducer = combineReducers({
    filters: filtersReducer,
    user: userReducer,
});

export default configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;