import { configureStore } from '@reduxjs/toolkit';
import techStatsReducer from './system_stats_slices/techStatsSlice'; 
import weeklyStorageReducer from './system_stats_slices/weeklyStorageSlice'
import entrepriseReducer from './entreprises_slices/entreprisesSlice';


const store = configureStore({
  reducer: {
    techStats: techStatsReducer, 
    weeklyStorage: weeklyStorageReducer,
    entreprises: entrepriseReducer,

  },
});

export default store;
