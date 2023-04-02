import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  doc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase-config";

// Start of add health center (send it to Firebase):
export const addHealthCenter = createAsyncThunk(
  "center/addHealthCenter",
  async (payload, { rejectWithValue }) => {
    try {
      const { name, address, category } = payload;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      const { lat, lon } = response.data[0];
      const docRef = await addDoc(collection(db, "healthcenters"), {
        id: uuidv4(),
        name,
        address,
        category,
        lat,
        lon,
      });
      return { docRef: docRef.id, name, address, category, lat, lon };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of add health center (send it to Firebase).

// Start of get health centers (get them from Firebase):
export const getCenters = createAsyncThunk(
  "center/getCenters",
  async (_, { rejectWithValue }) => {
    try {
      const centers = [];
      const querySnapshot = await getDocs(collection(db, "healthcenters"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        centers.push({ docRef: doc.id, ...doc.data() });
      });
      return centers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of get health centers (get them from Firebase).

// Start of deleting health centers:
export const deleteCenter = createAsyncThunk(
  "center/deleteCenter",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "healthcenters", id));
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// End of deleting health centers.

const healthCentersSlice = createSlice({
  name: "centers",
  initialState: {
    loading: false,
    center: [],
    error: null,
  },

  extraReducers: (builder) => {
    // Add health center cases:
    builder.addCase(addHealthCenter.pending, (state) => {});
    builder.addCase(addHealthCenter.fulfilled, (state, action) => {
      state.loading = false;
      state.center.push(action.payload);
      state.error = null;
    });
    builder.addCase(addHealthCenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get health center cases:
    builder.addCase(getCenters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCenters.fulfilled, (state, action) => {
      state.loading = false;
      state.center = action.payload;
      state.error = null;
    });
    builder.addCase(getCenters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete health center cases:
    builder.addCase(deleteCenter.pending, (state) => {});
    builder.addCase(deleteCenter.fulfilled, (state, action) => {
      state.loading = false;
      state.center = state.center.filter(
        (cent) => cent.docRef !== action.payload
      );
      state.error = null;
    });
    builder.addCase(deleteCenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default healthCentersSlice.reducer;
