import { configureStore } from '@reduxjs/toolkit';
import techStatsReducer from './tech_stats_slices/techStatsSlice'; // Import correct
import weeklyStorageReducer from './tech_stats_slices/weeklyStorageSlice'

const store = configureStore({
  reducer: {
    techStats: techStatsReducer, // Assurez-vous que le nom correspond
    weeklyStorage: weeklyStorageReducer,
  },
});

export default store;
