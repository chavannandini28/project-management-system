import axiosInstance from "./axiosInstance";

// Assign Task
export const assignTaskAPI = (data) =>
  axiosInstance.post("/assignment", data);

// Get Assignments
export const getAssignmentsAPI = () =>
  axiosInstance.get("/assignment");

// Get Assignment
export const getAssignmentAPI = (id) =>
  axiosInstance.get(`/assignment/${id}`);

// Update Assignment
export const updateAssignmentAPI = (id, data) =>
  axiosInstance.put(`/assignment/${id}`, data);

// Delete Assignment
export const deleteAssignmentAPI = (id) =>
  axiosInstance.delete(`/assignment/${id}`);