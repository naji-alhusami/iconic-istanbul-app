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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../firebase-config";

// Start of add iconic place (send it to Firebase):
export const addIconicPlace = createAsyncThunk(
  "place/addIconicPlace",
  async (payload, { rejectWithValue }) => {
    try {
      const id = uuidv4();
      const { name, address, category,description, isListed, selectedImage } = payload;

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      const { lat, lon } = response.data[0];

      // Upload the profile picture to Firebase Storage
      const storageRef = ref(storage, id);
      console.log(storageRef);
      const metadata = {
        contentType: selectedImage.type, // Set the correct MIME type of the file
      };
      const snapshot = await uploadBytes(
        storageRef,
        selectedImage,
        metadata
      );
      const downloadURL = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(collection(db, "iconic-places"), {
        id,
        category,
        name,
        description,
        address,
        profilePictureURL: downloadURL,
        lat,
        lon,
        isListed,
      });

      return {
        docRef: docRef.id,
        name,
        address,
        category,
        description,
        lat,
        lon,
        isListed,
        downloadURL,
      };
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
      state.place = state.place.filter((plc) => plc.docRef !== action.payload);
      state.error = null;
    });
    builder.addCase(deletePlace.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default iconicPlacesSlice.reducer;
