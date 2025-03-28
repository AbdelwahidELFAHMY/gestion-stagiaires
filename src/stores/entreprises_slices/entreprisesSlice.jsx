// src/redux/slices/entrepriseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
=
// Création de l'asyncThunk pour récupérer les entreprises depuis le backend
export const fetchEntreprises = createAsyncThunk(
  'entreprises/fetchEntreprises',
  async () => {
    const response = await axiosInstance.get('/entreprises'); // Assurez-vous que votre API backend est bien configurée
    return response.data;
  }
);

// Création du slice
const entrepriseSlice = createSlice({
  name: 'entreprises',
  initialState: {
    entreprises: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntreprises.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEntreprises.fulfilled, (state, action) => {
        state.loading = false;
        state.entreprises = action.payload;
      })
      .addCase(fetchEntreprises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default entrepriseSlice.reducer;
