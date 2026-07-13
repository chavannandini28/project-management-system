import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/auth/authSlice";
import userReducer from "../redux/user/userSlice";
import projectReducer from "../redux/project/projectSlice";
import taskReducer from "../redux/task/taskSlice";
import assignmentReducer from "../redux/assignment/assignmentSlice";
import roleRequestReducer from "../redux/roleRequest/roleRequestSlice";
import loadingReducer from "../redux/loading/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    task: taskReducer,
    assignment: assignmentReducer,
    roleRequest: roleRequestReducer,
    loading: loadingReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export default store;