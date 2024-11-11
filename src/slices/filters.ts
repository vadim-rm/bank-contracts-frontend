import {createSlice} from "@reduxjs/toolkit"
import {useSelector} from "react-redux";


const filters = createSlice({
    name: "filters",
    initialState: {
        name: "",
        type: ""
    },
    reducers: {
        setName(state, {payload}) {
            state.name = payload
        },
        setType(state, {payload}) {
            state.type = payload
        }
    }
})

export const useName = () =>
    useSelector((state) => state.filters.name)

export const useType = () =>
    useSelector((state) => state.filters.type)

export const {
    setName,
    setType
} = filters.actions


export default filters.reducer