// tachesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { getUsernameFromToken } from "../../utils/getUsernameFromToken";

export const fetchTaches = createAsyncThunk("taches/fetchTaches", async () => {
  const username = getUsernameFromToken();
  if (username == null) throw new Error("No username");
  const response = await axiosInstance.get(`/taches/${username}`);
  return response.data;
});


export const updateTacheProgress = createAsyncThunk(
  'taches/updateProgress',
  async ({ id, progress }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.patch(`/taches/${id}/progress?progress=${progress}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tachesSlice = createSlice({
  name: "taches",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTaches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTacheProgress.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
  },
});

export default tachesSlice.reducer;
