import { configureStore } from '@reduxjs/toolkit';
import techStatsReducer from './system_stats_slices/techStatsSlice'; 
import weeklyStorageReducer from './system_stats_slices/weeklyStorageSlice'
import entrepriseReducer from './entreprises_slices/entreprisesSlice';
import tachesReducer from './taches_slices/tachesSlice';
import commentaireReducer from './commentaires_slices/commentaireSlice';
import stagiaireReducer from './stagiaire_slices/stagiaireSlice';
import academicReducer from './stagiaire_slices/academicSlice';

const store = configureStore({
  reducer: {
    techStats: techStatsReducer, 
    weeklyStorage: weeklyStorageReducer,
    entreprises: entrepriseReducer,
    taches: tachesReducer,
    commentaires: commentaireReducer,
    stagiaire: stagiaireReducer,
    academic: academicReducer,
  },
});

export default store;
