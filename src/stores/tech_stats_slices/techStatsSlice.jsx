import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../utils/axiosInstance';

// Thunk pour récupérer les statistiques du backend
export const fetchTechStats = createAsyncThunk(
  'techStats/fetchTechStats',
  async () => {
    const response = await AxiosInstance.get('/system/statistics');
    return response.data;
  }
);


const initialState = {
  cpuUsage: '0%',
  memoryUsage: '0%',
  diskUsage: '0%',
  systemUptime: '0%',
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
};

const techStatsSlice = createSlice({
  name: 'techStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTechStats.fulfilled, (state, action) => {
        console.log("Réponse API:", action.payload);

        state.status = 'succeeded';
        // Remplir les statistiques dans le state
        state.cpuUsage = action.payload.cpuUsage;
        state.memoryUsage = action.payload.memoryUsage;
        state.diskUsage = action.payload.diskUsage;
        state.systemUptime = action.payload.systemUptime;
      })
      .addCase(fetchTechStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default techStatsSlice.reducer;
