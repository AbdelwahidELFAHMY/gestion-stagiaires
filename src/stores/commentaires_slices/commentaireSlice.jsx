// features/commentaire/commentaireSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { getUsernameFromToken } from '../../utils/getUsernameFromToken';

export const fetchCommentaires = createAsyncThunk(
  'commentaires/fetchCommentaires',
  async (stageId, { rejectWithValue }) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      const response = await axiosInstance.get(`/commentaires?stageId=${stageId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// features/commentaire/commentaireSlice.js
export const addCommentaire = createAsyncThunk(
  'commentaires/addCommentaire',
  async ({ stageId, commentaire }, { rejectWithValue}) => {
    try {
      const username = getUsernameFromToken();
      const response = await axiosInstance.post('/commentaires', {
        stageId,
        commentaire,
        stagiaireUsername: username
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentaireSlice = createSlice({
  name: 'commentaires',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentaires.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentaires.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCommentaires.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addCommentaire.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default commentaireSlice.reducer;