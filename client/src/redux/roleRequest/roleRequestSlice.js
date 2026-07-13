import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createRoleRequestAPI,
  getRoleRequestsAPI,
  getRoleRequestAPI,
  approveRoleRequestAPI,
  rejectRoleRequestAPI,
  deleteRoleRequestAPI,
} from "../../api/roleRequestAPI";

// =====================================
// Initial State
// =====================================

const initialState = {
  roleRequests: [],
  roleRequest: null,
  loading: false,
  error: null,
  success: false,
};

// =====================================
// Get All Role Requests
// =====================================

export const getRoleRequests = createAsyncThunk(
  "roleRequest/getRoleRequests",
  async (_, thunkAPI) => {
    try {
      const response = await getRoleRequestsAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch role requests"
      );
    }
  }
);

// =====================================
// Get Single Role Request
// =====================================

export const getRoleRequest = createAsyncThunk(
  "roleRequest/getRoleRequest",
  async (id, thunkAPI) => {
    try {
      const response = await getRoleRequestAPI(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch role request"
      );
    }
  }
);

// =====================================
// Create Role Request
// =====================================

export const createRoleRequest = createAsyncThunk(
  "roleRequest/createRoleRequest",
  async (requestData, thunkAPI) => {
    try {
      const response = await createRoleRequestAPI(requestData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create role request"
      );
    }
  }
);

// =====================================
// Approve Role Request
// =====================================

export const approveRoleRequest = createAsyncThunk(
  "roleRequest/approveRoleRequest",
  async (id, thunkAPI) => {
    try {
      const response = await approveRoleRequestAPI(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to approve role request"
      );
    }
  }
);

// =====================================
// Reject Role Request
// =====================================

export const rejectRoleRequest = createAsyncThunk(
  "roleRequest/rejectRoleRequest",
  async (id, thunkAPI) => {
    try {
      const response = await rejectRoleRequestAPI(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to reject role request"
      );
    }
  }
);

// =====================================
// Delete Role Request
// =====================================

export const deleteRoleRequest = createAsyncThunk(
  "roleRequest/deleteRoleRequest",
  async (id, thunkAPI) => {
    try {
      await deleteRoleRequestAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete role request"
      );
    }
  }
);

// =====================================
// Slice
// =====================================

const roleRequestSlice = createSlice({
  name: "roleRequest",

  initialState,

  reducers: {
    clearRoleRequest: (state) => {
      state.roleRequest = null;
    },

    clearRoleRequests: (state) => {
      state.roleRequests = [];
    },

    clearError: (state) => {
      state.error = null;
    },

    clearSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // Get All Requests
      // =========================

      .addCase(getRoleRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRoleRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.roleRequests =
          action.payload.roleRequests || action.payload;
      })

      .addCase(getRoleRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // Get Single Request
      // =========================

      .addCase(getRoleRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRoleRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.roleRequest =
          action.payload.roleRequest || action.payload;
      })

      .addCase(getRoleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // Create Request
      // =========================

      .addCase(createRoleRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(createRoleRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const newRequest =
          action.payload.roleRequest || action.payload;

        state.roleRequests.unshift(newRequest);
      })

      .addCase(createRoleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // Approve Request
      // =========================

      .addCase(approveRoleRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(approveRoleRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedRequest =
          action.payload.roleRequest || action.payload;

        state.roleRequest = updatedRequest;

        state.roleRequests = state.roleRequests.map((request) =>
          request._id === updatedRequest._id
            ? updatedRequest
            : request
        );
      })

      .addCase(approveRoleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // Reject Request
      // =========================

      .addCase(rejectRoleRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(rejectRoleRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedRequest =
          action.payload.roleRequest || action.payload;

        state.roleRequest = updatedRequest;

        state.roleRequests = state.roleRequests.map((request) =>
          request._id === updatedRequest._id
            ? updatedRequest
            : request
        );
      })

      .addCase(rejectRoleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // Delete Request
      // =========================

      .addCase(deleteRoleRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteRoleRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.roleRequests = state.roleRequests.filter(
          (request) => request._id !== action.payload
        );
      })

      .addCase(deleteRoleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearRoleRequest,
  clearRoleRequests,
  clearError,
  clearSuccess,
} = roleRequestSlice.actions;

export default roleRequestSlice.reducer;