import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, Timestamp, updateDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

// Initial state for the orders slice
const initialState = {
  orders: [],            // Array to hold the user's orders
  selectedOrder: null,   // The currently selected order for viewing details
  status: "idle",        // Status of the orders fetching process (idle, loading, succeeded, failed)
  error: null,           // Error message, if any, during the orders fetching or placing process
};

// Async thunk for placing an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ cart, userId, paymentMethod }, { rejectWithValue }) => {
    try {
      // Reference to the orders collection in Firestore
      const orderRef = collection(db, "orders");

      // Map cart items to order details
      const orderDetails = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price, // Assuming that each cart item contains price
      }));

      // Get the current timestamp
      const orderDate = Timestamp.now(); // Use Firestore Timestamp

      // Static orderStatusId (this could be dynamic based on your order status logic)
      const orderStatusId = "TUgeq6U27JsTojE1XukC";

      // Calculate the total amount of the order
      const totalAmount = orderDetails.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      // Create a new order document in Firestore
      const docRef = await addDoc(orderRef, {
        userId,
        orderDate, // Use Firestore Timestamp
        orderDetails,
        paymentMethod, // Include paymentMethod in the order data
        orderStatusId, // Add the static orderStatusId here
        totalAmount, // Save the total amount in the order document
      });

      // Get the generated orderId (document ID)
      const orderId = docRef.id;

      // Update the newly created order document with the orderId
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
        totalAmount, // Return the total amount of the order
      };
    } catch (error) {
      // Return the error message if the operation fails
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching orders for the current user
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      // Get the current user
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Reference to the orders collection in Firestore
      const ordersRef = collection(db, "orders");

      // Query to get only the orders of the current user
      const q = query(ordersRef, where("userId", "==", userId));

      // Get the snapshot of the orders collection
      const querySnapshot = await getDocs(q);

      // Map the documents to an array of order objects
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Return the fetched orders
      return orders;
    } catch (error) {
      // Return the error message if the operation fails
      return rejectWithValue(error.message);
    }
  }
);

// Create the orders slice
const ordersSlice = createSlice({
  name: "orders",    // Name of the slice
  initialState,      // Initial state of the slice
  reducers: {
    // Reducer to handle order selection
    selectOrder: (state, action) => {
      // Find the selected order by orderId
      state.selectedOrder = state.orders.find(
        (order) => order.orderId === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // Handling state changes for the placeOrder thunk
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";  // Set status to loading while the request is in progress
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when the request is successful
        state.orders.push(action.payload); // Add the new order to the orders array
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";   // Set status to failed if the request fails
        state.error = action.payload; // Store the error message
      });

    // Handling state changes for the fetchOrders thunk
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";  // Set status to loading while the request is in progress
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when the request is successful
        state.orders = action.payload; // Replace the orders array with the fetched orders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";   // Set status to failed if the request fails
        state.error = action.payload; // Store the error message
      });
  },
});

// Export the actions to use in components
export const { selectOrder } = ordersSlice.actions;

// Export the reducer to include in the store
export default ordersSlice.reducer;
