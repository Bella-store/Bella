import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

// Async action to fetch products from Firestore
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    filteredItems: [], // Add filtered items
    selectedCategories: [], // Add category filters
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
      state.filteredItems = action.payload; // Initialize filtered items
    },
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
      state.filteredItems = state.items.filter((product) =>
        action.payload.includes(product.category)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload; // Initialize filtered items
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setProducts, setSelectedCategories } = productsSlice.actions;

export default productsSlice.reducer;
