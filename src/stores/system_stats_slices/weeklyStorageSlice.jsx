import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Action pour récupérer les données réelles de stockage hebdomadaire
export const fetchWeeklyStorage = createAsyncThunk(
  "weeklyStorage/fetchWeeklyStorage",
  async () => {
    const response = await axiosInstance.get("/system/weekly_storage");  // Assurez-vous que l'URL est correcte
    return response.data;  // Retourne les données de stockage hebdomadaires
  }
);

const weeklyStorageSlice = createSlice({
  name: "weeklyStorage",
  initialState: {
    history: [],
    status: "idle", // idle, loading, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeeklyStorage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.history = action.payload;
      })
      .addCase(fetchWeeklyStorage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weeklyStorageSlice.reducer;
