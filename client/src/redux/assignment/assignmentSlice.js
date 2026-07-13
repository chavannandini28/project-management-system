import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  assignTaskAPI,
  getAssignmentsAPI,
  getAssignmentAPI,
  updateAssignmentAPI,
  deleteAssignmentAPI,
} from "../../api/assignmentAPI";

// =====================================
// Initial State
// =====================================

const initialState = {
  assignments: [],
  assignment: null,
  loading: false,
  error: null,
  success: false,
};

// =====================================
// Get All Assignments
// =====================================

export const getAssignments = createAsyncThunk(
  "assignment/getAssignments",
  async (_, thunkAPI) => {
    try {
      const response = await getAssignmentsAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch assignments"
      );
    }
  }
);

// =====================================
// Get Single Assignment
// =====================================

export const getAssignment = createAsyncThunk(
  "assignment/getAssignment",
  async (id, thunkAPI) => {
    try {
      const response = await getAssignmentAPI(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch assignment"
      );
    }
  }
);

// =====================================
// Assign Task
// =====================================

export const assignTask = createAsyncThunk(
  "assignment/assignTask",
  async (assignmentData, thunkAPI) => {
    try {
      const response = await assignTaskAPI(assignmentData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to assign task"
      );
    }
  }
);

// =====================================
// Update Assignment
// =====================================

export const updateAssignment = createAsyncThunk(
  "assignment/updateAssignment",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateAssignmentAPI(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update assignment"
      );
    }
  }
);

// =====================================
// Delete Assignment
// =====================================

export const deleteAssignment = createAsyncThunk(
  "assignment/deleteAssignment",
  async (id, thunkAPI) => {
    try {
      await deleteAssignmentAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete assignment"
      );
    }
  }
);

// =====================================
// Slice
// =====================================

const assignmentSlice = createSlice({
  name: "assignment",

  initialState,

  reducers: {
    clearAssignment: (state) => {
      state.assignment = null;
    },

    clearAssignments: (state) => {
      state.assignments = [];
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
      // Get Assignments
      // ===========================

      .addCase(getAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments =
          action.payload.assignments || action.payload;
      })

      .addCase(getAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Get Assignment
      // ===========================

      .addCase(getAssignment.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignment =
          action.payload.assignment || action.payload;
      })

      .addCase(getAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Assign Task
      // ===========================

      .addCase(assignTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(assignTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const newAssignment =
          action.payload.assignment || action.payload;

        state.assignments.unshift(newAssignment);
      })

      .addCase(assignTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Update Assignment
      // ===========================

      .addCase(updateAssignment.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedAssignment =
          action.payload.assignment || action.payload;

        state.assignment = updatedAssignment;

        state.assignments = state.assignments.map((assignment) =>
          assignment._id === updatedAssignment._id
            ? updatedAssignment
            : assignment
        );
      })

      .addCase(updateAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // Delete Assignment
      // ===========================

      .addCase(deleteAssignment.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.assignments = state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        );
      })

      .addCase(deleteAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearAssignment,
  clearAssignments,
  clearError,
  clearSuccess,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;