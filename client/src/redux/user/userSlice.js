import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUsersAPI,
  getUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "../../api/userAPI";

// ============================
// Initial State
// ============================

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  success: false,
};

// ============================
// Get All Users
// ============================

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await getUsersAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// ============================
// Get Single User
// ============================

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, thunkAPI) => {
    try {
      const response = await getUserAPI(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// ============================
// Update User
// ============================

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateUserAPI(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// ============================
// Delete User
// ============================

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      await deleteUserAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// ============================
// Slice
// ============================

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    clearUser: (state) => {
      state.user = null;
    },

    clearUsers: (state) => {
      state.users = [];
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

      // ===========================
      // Get Users
      // ===========================

      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || action.payload;
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Get User
      // ===========================

      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
      })

      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Update User
      // ===========================

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.user = action.payload.user || action.payload;

        state.users = state.users.map((user) =>
          user._id === state.user._id ? state.user : user
        );
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Delete User
      // ===========================

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearUser,
  clearUsers,
  clearError,
  clearSuccess,
} = userSlice.actions;

export default userSlice.reducer;