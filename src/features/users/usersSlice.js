import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  // updatePassword,
  // deleteUser,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  // deleteDoc
} from 'firebase/firestore';

// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  db,
  auth,
  googleAuth,
  // storage,
} from '../../firebase-config';

// start of signup:
export const signupUser = createAsyncThunk(
  'user/signupUser',
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

      const docRef = doc(db, 'users', user.uid);
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
// End of signup

// Start of Login:
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified === false) {
        return { error: 'Email is Not Verified' };
      }
      console.log('inside login');
      const docRef = doc(db, 'users', user.uid);
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
  'user/loginUserWithGoogle',
  async ({ rejectWithValue }) => {
    try {
      const { user } = await signInWithPopup(auth, googleAuth);
      console.log(user);
      const docRef = doc(db, 'users', user.uid);
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
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    console.log('inside logout');
    try {
      await signOut(auth);
      return {};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// End of Logout User:

// Start of addHealthCenter:
// export const addHealthCenter = createAsyncThunk(
//   'user/addMarker',
//   async (playload, { rejectWithValue }) => {
//     try {
//       const { name, address, category } = playload;
//       await axios
//         .get(
//           `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
//         )
//         .then((response) => response.data[0]);
//       // const data = await response.json();
//       // const { lat, lon } = data[0];
//       // console.log(lat, lon);
//       // const newHealthCenter = { name, address, category, lat, lon };
//       // setHealthCenters([...healthCenters, newHealthCenter]);
//       return { name, address, category };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// End of Add Marker.


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    user: {},
    marker: {},
    error: null,
  },

  extraReducers: (builder) => {
    // Signup Cases:
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      console.log('naji');
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
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        console.log(action.payload);
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
      console.log(action.payload);
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

    // Add Marker to the Map cases:
    // builder.addCase(addHealthCenter.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(addHealthCenter.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.loading = false;
    //   state.marker = action.payload;
    //   state.error = null;
    // });
    // builder.addCase(addHealthCenter.rejected, (state, action) => {
    //   state.loading = false;
    //   state.marker = {};
    //   state.error = action.payload;
    // });

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
  },
});

export default usersSlice.reducer;
export const { AddAnswer } = usersSlice.actions;
