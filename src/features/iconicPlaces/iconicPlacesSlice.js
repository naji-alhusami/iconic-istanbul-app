import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  doc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase-config";

// Start of add iconic place (send it to Firebase):
export const addIconicPlace = createAsyncThunk(
  "place/addIconicPlace",
  async (payload, { rejectWithValue }) => {
    try {
      const { name, address, category, isListed } = payload;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      const { lat, lon } = response.data[0];
      const docRef = await addDoc(collection(db, "iconic-places"), {
        id: uuidv4(),
        name,
        address,
        category,
        lat,
        lon,
        isListed,
      });
      return { docRef: docRef.id, name, address, category, lat, lon, isListed };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of add iconic place (send it to Firebase).

// Start of get iconic places (get them from Firebase):
export const getPlaces = createAsyncThunk(
  "place/getPlaces",
  async (_, { rejectWithValue }) => {
    try {
      const places = [];
      const querySnapshot = await getDocs(collection(db, "iconic-places"));
      querySnapshot.forEach((doc) => {
        places.push({ docRef: doc.id, ...doc.data() });
      });
      return places;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of get iconic places (get them from Firebase).

// Start of Edit iconic places (get them from Firebase):
export const editPlace = createAsyncThunk(
  "palce/editPlace",
  async (payload, { getState, rejectWithValue }) => {
    const { place } = getState();
    try {
      const { id, isListed } = payload;
      const docRef = doc(db, "iconic-places", id);
      await updateDoc(docRef, {
        isListed: !isListed,
      });
      const newState = place.place.map((plc) => {
        if (plc.docRef === id) {
          return { ...plc, isListed: !isListed };
        } else {
          return plc;
        }
      });
      return newState;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// End of edit iconic places (get them from Firebase).

// Start of deleting iconic places:
export const deletePlace = createAsyncThunk(
  "place/deletePlace",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "iconic-places", id));
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// End of deleting iconic places.

const iconicPlacesSlice = createSlice({
  name: "places",
  initialState: {
    loading: false,
    place: [],
    error: null,
  },

  extraReducers: (builder) => {
    // Add iconic place cases:
    builder.addCase(addIconicPlace.pending, (state) => {});
    builder.addCase(addIconicPlace.fulfilled, (state, action) => {
      state.loading = false;
      state.place = [...state.place, action.payload];
      state.error = null;
    });
    builder.addCase(addIconicPlace.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get iconic place cases:
    builder.addCase(getPlaces.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlaces.fulfilled, (state, action) => {
      state.loading = false;
      state.place = action.payload;
      state.error = null;
    });
    builder.addCase(getPlaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Edit iconic place cases:
    builder.addCase(editPlace.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editPlace.fulfilled, (state, action) => {
      state.loading = false;
      state.place = action.payload;
      state.error = null;
    });
    builder.addCase(editPlace.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete iconic place cases:
    builder.addCase(deletePlace.pending, (state) => {});
    builder.addCase(deletePlace.fulfilled, (state, action) => {
      state.loading = false;
      state.place = state.place.filter(
        (plc) => plc.docRef !== action.payload
      );
      state.error = null;
    });
    builder.addCase(deletePlace.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default iconicPlacesSlice.reducer;
