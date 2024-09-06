import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array to store favourited products
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If the product is already in the favourites, remove it
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        // Otherwise, add it to the list
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
