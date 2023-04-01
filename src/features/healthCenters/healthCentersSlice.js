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

// Start of addHealthCenter:
export const addHealthCenter = createAsyncThunk(
  "center/add",
  async (payload, { rejectWithValue }) => {
    try {
      const { name, address, category } = payload;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      const { lat, lon } = response.data[0];
      console.log(payload);
      const docRef = await addDoc(collection(db, "healthcenters"), {
        id: uuidv4(),
        name,
        address,
        category,
        lat,
        lon,
      });
      console.log(docRef);
      return { docRef: docRef.id, name, address, category, lat, lon };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
// End of Add Marker.

// Start of addHealthCenter:
export const getCenters = createAsyncThunk(
  "center/get",
  async (_, { rejectWithValue }) => {
    try {
      const centers = [];
      const querySnapshot = await getDocs(collection(db, "healthcenters"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        centers.push({ docRef: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      return centers;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
// End of Add Marker.

export const deleteCenter = createAsyncThunk(
  "center/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await deleteDoc(doc(db, "healthcenters", id));
      console.log(response);
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const healthCentersSlice = createSlice({
  name: "centers",
  initialState: {
    loading: false,
    center: [],
    error: null,
  },

  extraReducers: (builder) => {
    // Add Marker to the Map cases:
    builder.addCase(addHealthCenter.pending, (state) => {
      //   state.loading = true;
    });
    builder.addCase(addHealthCenter.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.center.push(action.payload);
      state.error = null;
    });
    builder.addCase(addHealthCenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get Marker to the Map cases:
    builder.addCase(getCenters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCenters.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.center = action.payload;
      state.error = null;
    });
    builder.addCase(getCenters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete Marker to the Map cases:
    builder.addCase(deleteCenter.pending, (state) => {
      //   state.loading = true;
    });
    builder.addCase(deleteCenter.fulfilled, (state, action) => {
      console.log(action.payload);
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
