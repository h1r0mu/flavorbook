import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    beanIds: [],
    countries: [],
};

const filtersSlice = createSlice({
    name: "beansFilters",
    initialState,
    reducers: {
        statusFilterChanged(state, action) {
            state.status = action.payload;
        },
        beanIdFilterChanged(state, action) {
            state.beanIds = action.payload;
        },
        countryFilterChanged(state, action) {
            state.countries = action.payload;
        },
    },
});

export const {beanIdFilterChanged, countryFilterChanged, statusFilterChanged} =
    filtersSlice.actions;

export default filtersSlice.reducer;
