import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTasksAPI,
  getTaskAPI,
  getProjectTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "../../api/taskAPI";

// ===================================
// Initial State
// ===================================

const initialState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  success: false,
};

// ===================================
// Get All Tasks
// ===================================

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => {
    try {
      const response = await getTasksAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

// ===================================
// Get Project Tasks
// ===================================

export const getProjectTasks = createAsyncThunk(
  "task/getProjectTasks",
  async (projectId, thunkAPI) => {
    try {
      const response = await getProjectTasksAPI(projectId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch project tasks"
      );
    }
  }
);

// ===================================
// Get Single Task
// ===================================

export const getTask = createAsyncThunk(
  "task/getTask",
  async (id, thunkAPI) => {
    try {
      const response = await getTaskAPI(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch task"
      );
    }
  }
);

// ===================================
// Create Task
// ===================================

export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData, thunkAPI) => {
    try {
      const response = await createTaskAPI(taskData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

// ===================================
// Update Task
// ===================================

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateTaskAPI(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

// ===================================
// Delete Task
// ===================================

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, thunkAPI) => {
    try {
      await deleteTaskAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

// ===================================
// Slice
// ===================================

const taskSlice = createSlice({
  name: "task",

  initialState,

  reducers: {
    clearTask: (state) => {
      state.task = null;
    },

    clearTasks: (state) => {
      state.tasks = [];
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

      // =====================
      // Get Tasks
      // =====================

      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks || action.payload;
      })

      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // Get Project Tasks
      // =====================

      .addCase(getProjectTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProjectTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks || action.payload;
      })

      .addCase(getProjectTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // Get Task
      // =====================

      .addCase(getTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task || action.payload;
      })

      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // Create Task
      // =====================

      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const newTask = action.payload.task || action.payload;

        state.tasks.unshift(newTask);
      })

      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // Update Task
      // =====================

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedTask = action.payload.task || action.payload;

        state.task = updatedTask;

        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      })

      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // Delete Task
      // =====================

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload
        );
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearTask,
  clearTasks,
  clearError,
  clearSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;