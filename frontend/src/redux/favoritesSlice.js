import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "favorites",
  storage,
};

const initialState = {
  favoriteTrucksList: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, { payload }) => {
      state.favoriteTrucksList.push(payload);
      console.log("state.favoriteTrucksList", state.favoriteTrucksList);
    },

    deleteFavorite: (state, { payload }) => {
      state.favoriteTrucksList = state.favoriteTrucksList.filter(
        camper => camper !== payload
      );
      console.log("state.favoriteTrucksList", state.favoriteTrucksList);
    },
  },
});

export const favoriteReducer = favoriteSlice.reducer;
export const { addFavorite, deleteFavorite } = favoriteSlice.actions;
export const selectFavoriteList = state => state.favorite.favoriteTrucksList;

export const persistedFavoriteReducer = persistReducer(
  persistConfig,
  favoriteReducer
);
