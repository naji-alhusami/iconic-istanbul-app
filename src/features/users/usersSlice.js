import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { db, auth, googleAuth } from "../../firebase-config";

// start of signup:
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (payload, { rejectWithValue }) => {
    const { email, password, birthdayDay, birthdayMonth, birthdayYear } =
      payload;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(auth.currentUser);

      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        id: user.uid,
        email,
        name: `${payload.firstName} ${payload.lastName}`,
        birthdayDay,
        birthdayMonth,
        birthdayYear,
      });

      return { id: user.uid, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of signup.

// Start of Login:
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user.emailVerified === false) {
        return rejectWithValue("Email is Not Verified");
      }
      const docRef = doc(db, "users", response.user.uid);
      const docSnap = await getDoc(docRef);

      return docSnap.data();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of Login.

// Sign in with Google:
export const loginUserWithGoogle = createAsyncThunk(
  "user/loginUserWithGoogle",
  async ({ rejectWithValue }) => {
    try {
      const { user } = await signInWithPopup(auth, googleAuth);
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        id: user.uid,
        email: user.email,
        name: user.displayName,
      });
      return { id: user.uid, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of Sign-in with Google.

// Start of Logout User:
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return {};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// End of Logout User.

// Start of Load User:
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (payload, { rejectWithValue }) => {
    try {
      if(payload.emailVerified === false) {
        return rejectWithValue("Email is not verified");
      }
      const docRef = doc(db, "users", payload.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of of Load User.

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: true,
    user: {},
    error: null,
    userlogin: false,
  },

  extraReducers: (builder) => {
    // Signup Cases:
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.signedup = true;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });

    // Login Cases:
    builder.addCase(loginUser.pending, (state) => {
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.user = null;
        state.userlogin = false;
        state.error = action.payload.error;
      } else {
        state.user = action.payload;
        state.userlogin = true;
        state.error = null;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });

    // Login with Google Cases:
    builder.addCase(loginUserWithGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginUserWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });

    // Logout Cases:
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = {};
      state.error = null;
      state.userlogin = false;
      state.signedup = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });

    // Load user Cases:
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.error) {
        state.user = null;
        state.userlogin = false;
        state.error = action.payload.error;
      } else {
        state.user = action.payload;
        state.userlogin = true;
        state.error = null;
      }
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
export const { AddAnswer } = usersSlice.actions;
