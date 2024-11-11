import {combineReducers, configureStore} from "@reduxjs/toolkit"
import filtersReducer from "./slices/filters.ts"


export default configureStore({
    reducer: combineReducers({
        filters: filtersReducer
    })
})