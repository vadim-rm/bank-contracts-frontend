import {combineReducers, configureStore} from "@reduxjs/toolkit"
import filtersReducer from "./slices/filters.ts"


const rootReducer = combineReducers({
    filters: filtersReducer,
    // add other reducers here
});

export default configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;