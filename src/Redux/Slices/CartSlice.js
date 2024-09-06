import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Helper functions to calculate total quantity and price
const calculateTotalQuantity = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0);
const calculateTotalPrice = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, imageUrl, price } = action.payload;

      // Check if an item with the same id AND title exists
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
      } else {
        state.items.push({ id, title, imageUrl, price, quantity: 1 });
      }

      // Recalculate totals after adding item
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotalPrice(state.items);
    },

    adjustQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      // Find item based on both id and uid
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;

        // Recalculate totals after adjusting quantity
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);

        // Recalculate totals after removing item
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, adjustQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
