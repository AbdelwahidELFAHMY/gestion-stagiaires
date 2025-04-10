import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchStagiaireInfos = createAsyncThunk(
  'stagiaire/fetchInfos',
  async (username) => {
    const response = await axiosInstance.get(`/stagiaires/infos_personelle/${username}`);
    return response.data;
  }
);

export const updateStagiaire = createAsyncThunk(
  'stagiaire/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/stagiaires/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const stagiaireSlice = createSlice({
  name: 'stagiaire',
  initialState: {
    data: null,
    loading: false,
    error: null,
    updateStatus: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStagiaireInfos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStagiaireInfos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStagiaireInfos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStagiaire.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateStagiaire.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateStagiaire.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetUpdateStatus } = stagiaireSlice.actions;
export default stagiaireSlice.reducer;