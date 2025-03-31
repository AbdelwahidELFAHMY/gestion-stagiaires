import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Async Thunks
export const fetchEntreprises = createAsyncThunk(
  "entreprises/fetchEntreprises",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/entreprises");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createEntreprise = createAsyncThunk(
  "entreprises/create",
  async ({ entreprise, rh }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const request = {
        name: entreprise.name,
        email: entreprise.email,
        phone: entreprise.phone,
        address: entreprise.address,
        website: entreprise.website,
        industry: entreprise.industry,
        isActive: entreprise.isActive,
        username: rh.username,
        password: rh.password,
        nom: rh.nom,
        prenom: rh.prenom,
        telephone: rh.phone,
        adresse: rh.adresse,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(request)], {
          type: "application/json",
        })
      );

      if (entreprise.logo) {
        formData.append("logo", entreprise.logo);
      }
      if (rh.photo) {
        formData.append("photo", rh.photo);
      }

      const response = await axiosInstance.post(
        "/admin/entreprises",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          maxBodyLength: 10 * 1024 * 1024,
          maxContentLength: 10 * 1024 * 1024, 
        }
      );

      return response.data;
    } catch (error) {
      if (error.response?.data?.message?.includes("size")) {
        return rejectWithValue(
          "La taille des fichiers dépasse la limite autorisée (5MB max)"
        );
      }
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const toggleEntrepriseStatus = createAsyncThunk(
  "entreprises/toggleStatus",
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      isActive
        ? await axiosInstance.patch(`/admin/entreprises/${id}/deactivate`)
        : await axiosInstance.patch(`/admin/entreprises/${id}/activate`);
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteEntreprise = createAsyncThunk(
  "entreprises/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/entreprises/${id}`);
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const entrepriseSlice = createSlice({
  name: "entreprises",
  initialState: {
    entreprises: [],
    loading: false,
    error: null,
    operationLoading: false,
    operationError: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.operationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch entreprises
      .addCase(fetchEntreprises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEntreprises.fulfilled, (state, action) => {
        state.loading = false;
        state.entreprises = action.payload;
      })
      .addCase(fetchEntreprises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create entreprise
      .addCase(createEntreprise.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(createEntreprise.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.entreprises.push(action.payload);
      })
      .addCase(createEntreprise.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })

      // Toggle status
      .addCase(toggleEntrepriseStatus.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(toggleEntrepriseStatus.fulfilled, (state, action) => {
        state.operationLoading = false;
        const index = state.entreprises.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.entreprises[index] = action.payload;
        }
      })
      .addCase(toggleEntrepriseStatus.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })

      // Delete entreprise
      .addCase(deleteEntreprise.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(deleteEntreprise.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.entreprises = state.entreprises.filter(
          (e) => e.id !== action.payload
        );
      })
      .addCase(deleteEntreprise.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export const { clearErrors } = entrepriseSlice.actions;
export default entrepriseSlice.reducer;
