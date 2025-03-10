import { configureStore } from '@reduxjs/toolkit';
import techStatsReducer from './tech_stats_slices/techStatsSlice'; // Import correct

const store = configureStore({
  reducer: {
    techStats: techStatsReducer, // Assurez-vous que le nom correspond
  },
});

export default store;
