import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ cart, userId, paymentMethod }, { rejectWithValue }) => {
    try {
      // Create a new order document in Firestore
      const orderRef = collection(db, "orders");

      // Map cart to orderDetails array with only product IDs and quantities
      const orderDetails = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      // Get the current timestamp
      const orderDate = Timestamp.now(); // Use Firestore Timestamp

      // Define the static orderStatusId
      const orderStatusId = "TUgeq6U27JsTojE1XukC";

      // Create a new order document first to get the document ID
      const docRef = await addDoc(orderRef, {
        userId,
        orderDate, // Use Firestore Timestamp
        orderDetails,
        paymentMethod, // Include paymentMethod in the order data
        orderStatusId, // Add the static orderStatusId here
      });

      // Extract the document ID
      const orderId = docRef.id;

      // Update the order document with the orderId field
      await updateDoc(docRef, {
        orderId, // Include the orderId field
      });

      // Return the order data including orderId and orderStatusId
      return {
        orderId,
        userId,
        orderDate,
        orderDetails,
        paymentMethod,
        orderStatusId, // Return orderStatusId with the rest of the order data
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
