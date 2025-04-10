import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { getUsernameFromToken } from '../../utils/getUsernameFromToken';

export const fetchAcademicInfos = createAsyncThunk(
  'academic/fetchInfos',
  async (stagiaireId) => {
    const response = await axiosInstance.get(`/info_academic/${stagiaireId}`);
    return response.data;
  }
);

export const updateAcademicInfos = createAsyncThunk(
  'academic/updateInfos',
  async ({ data, cvFile, conventionFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      if (cvFile) formData.append('cv', cvFile);
      if (conventionFile) formData.append('convention', conventionFile);

      const username = getUsernameFromToken();
      const response = await axiosInstance.put(
        `/info_academic/${username}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const academicSlice = createSlice({
  name: 'academic',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicInfos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicInfos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAcademicInfos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Ajouter dans extraReducers
.addCase(updateAcademicInfos.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateAcademicInfos.fulfilled, (state, action) => {
  state.loading = false;
  state.data = action.payload;
})
.addCase(updateAcademicInfos.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});  
  },
});

export default academicSlice.reducer;