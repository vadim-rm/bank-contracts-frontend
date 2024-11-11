import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface FiltersState {
    name: string;
    type: string;
}

const initialState: FiltersState = {
    name: "",
    type: ""
};

const filters = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setType(state, action: PayloadAction<string>) {
            state.type = action.payload;
        }
    }
});

export const useName = () =>
    useSelector((state: RootState) => state.filters.name);

export const useType = () =>
    useSelector((state: RootState) => state.filters.type);

export const {setName, setType} = filters.actions;

export default filters.reducer;
