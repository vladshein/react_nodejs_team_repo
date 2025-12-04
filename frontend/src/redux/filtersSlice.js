import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    AC: false,
    TV: false,
    transmission: "",
    kitchen: false,
    bathroom: false,
    form: "",
  },
  location: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
      console.log("Updated filters:", state.filters);
    },
    addLocation: (state, { payload }) => {
      state.location = payload;
    },
  },
});

export const selectLocationFilter = state => state.filters.location;
export const selectFilter = state => state.filters.filters;
export const filtersReducer = filtersSlice.reducer;
export const { addFilter } = filtersSlice.actions;
export const { addLocation } = filtersSlice.actions;
