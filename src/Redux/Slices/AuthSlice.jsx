import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, fullName, role }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDetails = {
        fullName,
        email,
        role: role || "user", // Allow dynamic role assignment
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid), userDetails);

      return { user, userDetails };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user details from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userDetails = docSnap.data();
        return { user, userDetails };
      } else {
        return rejectWithValue("User document does not exist");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
  console.log("User signed out");
  // const nav = useNavigate();
  // nav("/login");
});

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return usersList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch specific user data by UID
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userDetails = docSnap.data();
        return { userDetails };
      } else {
        return rejectWithValue("User document does not exist");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userDetails: null,
    loading: false,
    error: null,
    role: null,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userDetails = action.payload.userDetails;
        state.role = action.payload.userDetails.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userDetails = action.payload.userDetails;
        state.role = action.payload.userDetails.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.userDetails = null;
        state.role = null;
      })

      // Fetch user data
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload.userDetails;
        state.role = action.payload.userDetails.role;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
