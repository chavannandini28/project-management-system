import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
  buttonLoading: false,
  pageLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",

  initialState,

  reducers: {
    // Global Loader
    startLoading: (state) => {
      state.globalLoading = true;
    },

    stopLoading: (state) => {
      state.globalLoading = false;
    },

    // Button Loader
    startButtonLoading: (state) => {
      state.buttonLoading = true;
    },

    stopButtonLoading: (state) => {
      state.buttonLoading = false;
    },

    // Page Loader
    startPageLoading: (state) => {
      state.pageLoading = true;
    },

    stopPageLoading: (state) => {
      state.pageLoading = false;
    },

    // Reset All Loaders
    resetLoading: (state) => {
      state.globalLoading = false;
      state.buttonLoading = false;
      state.pageLoading = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  startButtonLoading,
  stopButtonLoading,
  startPageLoading,
  stopPageLoading,
  resetLoading,
} = loadingSlice.actions;

export default loadingSlice.reducer;