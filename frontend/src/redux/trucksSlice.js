import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchTrucksOp, fetchOneOp } from "./trucksOps";
import { selectFilter, selectLocationFilter } from "./filtersSlice";

const initialState = {
  items: [],
  loading: false,
  error: null,
  item: { reviews: [], gallery: [] },
  page: 1,
  totalPages: 0,
};

const trucksSlice = createSlice({
  name: "trucks",
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchTrucksOp.pending, state => {
        state.loading = true;
        console.log("state", state);
      })
      .addCase(fetchTrucksOp.fulfilled, (state, { payload }) => {
        console.log("payload", payload);
        state.items = payload.items;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTrucksOp.rejected, (state, { payload }) => {
        console.log("error", payload);
        state.loading = false;
        state.error = null;
      })

      .addCase(fetchOneOp.pending, state => {
        state.loading = true;
        state.error = null;
        console.log("state", state);
      })
      .addCase(fetchOneOp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        console.log("payload", payload);
        state.item = JSON.parse(JSON.stringify(payload));
        console.log("state.item", state.item);
      })
      .addCase(fetchOneOp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log("error", payload);
      });
  },
});

const selectLoading = state => state.trucks.loading;
const selectError = state => state.trucks.error;
const selectTrucks = state => state.trucks.items;
const selectOne = state => state.trucks.item;

// Memoized selector
const selectFilteredTrucks = createSelector(
  [selectTrucks, selectLocationFilter],
  (trucks, filter) => {
    return trucks.filter(contact =>
      contact.location.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

const applyFilters = createSelector(
  [selectTrucks, selectFilter, selectLocationFilter],
  (trucks, filters, location) => {
    const activeFilters = Object.keys(filters).filter(
      key => filters[key] !== "" && filters[key] !== false
    );

    const filteredLocationItems = trucks.filter(contact =>
      contact.location.toLowerCase().includes(location.toLowerCase())
    );
    console.log("Active filters:", activeFilters);
    console.log("trucks:", trucks);

    const filteredItems =
      activeFilters.length === 0
        ? filteredLocationItems
        : filteredLocationItems.filter(item =>
            activeFilters.every(filter => item[filter] === filters[filter])
          );

    console.log("Filtered items:", filteredItems);
    return filteredItems;
  }
);

export const trucksReducer = trucksSlice.reducer;

export {
  selectLoading,
  selectError,
  selectTrucks,
  selectFilteredTrucks,
  selectOne,
  applyFilters,
};
