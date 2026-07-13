import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaEdit,
  FaProjectDiagram,
  FaCalendarAlt,
  FaFlag,
  FaCheckCircle,
} from "react-icons/fa";

import Loader from "../common/Loader";

const ProjectDetails = ({ projectId }) => {
  const { projects, loading } = useSelector(
    (state) => state.project
  );

  const project = projects.find(
    (item) => item._id === projectId
  );

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!project) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Project Not Found
        </h2>

        <Link
          to="/projects"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          Go Back
        </Link>
      </div>
    );
  }

  const progress =
    project.progress ??
    (project.totalTasks
      ? Math.round(
          ((project.completedTasks || 0) /
            project.totalTasks) *
            100
        )
      : 0);

  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";

      case "Medium":
        return "bg-yellow-500";

      case "Low":
        return "bg-green-500";

      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

          <div>

            <Link
              to="/projects"
              className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
            >
              <FaArrowLeft />

              Back to Projects
            </Link>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">

                <FaProjectDiagram
                  size={30}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  {project.name}
                </h1>

                <p className="text-gray-500 mt-2">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

          <div className="flex flex-wrap gap-3">

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>

            <span
              className={`px-4 py-2 rounded-full text-white font-semibold ${priorityColor(
                project.priority
              )}`}
            >
              {project.priority}
            </span>

            <Link
              to={`/projects/edit/${project._id}`}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              <FaEdit />

              Edit Project
            </Link>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-between mb-4">

          <h2 className="text-xl font-bold flex items-center gap-2">

            <FaCheckCircle className="text-blue-600" />

            Project Progress

          </h2>

          <span className="font-bold text-lg">

            {progress}%

          </span>

        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full">

          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>


          {/* Information & Statistics */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Project Information */}

        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-6">
            Project Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex items-start gap-3">

              <FaCalendarAlt
                className="text-blue-600 mt-1"
                size={18}
              />

              <div>

                <p className="text-gray-500 text-sm">
                  Start Date
                </p>

                <p className="font-semibold">
                  {project.startDate
                    ? new Date(
                        project.startDate
                      ).toLocaleDateString()
                    : "-"}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <FaCalendarAlt
                className="text-red-500 mt-1"
                size={18}
              />

              <div>

                <p className="text-gray-500 text-sm">
                  End Date
                </p>

                <p className="font-semibold">
                  {project.endDate
                    ? new Date(
                        project.endDate
                      ).toLocaleDateString()
                    : "-"}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <FaFlag
                className="text-orange-500 mt-1"
                size={18}
              />

              <div>

                <p className="text-gray-500 text-sm">
                  Priority
                </p>

                <p className="font-semibold">
                  {project.priority}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <FaCheckCircle
                className="text-green-600 mt-1"
                size={18}
              />

              <div>

                <p className="text-gray-500 text-sm">
                  Status
                </p>

                <p className="font-semibold">
                  {project.status}
                </p>

              </div>

            </div>

          </div>

          {/* Project Manager */}

          <div className="mt-8 border-t pt-6">

            <h3 className="text-lg font-semibold mb-4">
              Project Manager
            </h3>

            <div className="flex items-center gap-4">

              <img
                src={
                  project.manager?.avatar ||
                  `https://ui-avatars.com/api/?name=${
                    project.manager?.name || "Manager"
                  }`
                }
                alt="Manager"
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>

                <h4 className="font-semibold">
                  {project.manager?.name || "Not Assigned"}
                </h4>

                <p className="text-gray-500">
                  {project.manager?.email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-6">
            Statistics
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center">

              <span>Total Tasks</span>

              <span className="font-bold text-xl">
                {project.totalTasks || 0}
              </span>

            </div>

            <div className="flex justify-between items-center">

              <span>Completed Tasks</span>

              <span className="font-bold text-green-600 text-xl">
                {project.completedTasks || 0}
              </span>

            </div>

            <div className="flex justify-between items-center">

              <span>Pending Tasks</span>

              <span className="font-bold text-yellow-600 text-xl">
                {(project.totalTasks || 0) -
                  (project.completedTasks || 0)}
              </span>

            </div>

            <div className="flex justify-between items-center">

              <span>Team Members</span>

              <span className="font-bold text-blue-600 text-xl">
                {project.members?.length || 0}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Team Members */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-6">
          Team Members
        </h2>

        {project.members?.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {project.members.map((member) => (

              <div
                key={member._id}
                className="border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition"
              >

                <img
                  src={
                    member.avatar ||
                    `https://ui-avatars.com/api/?name=${member.name}`
                  }
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>

                  <h4 className="font-semibold">
                    {member.name}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {member.email}
                  </p>

                  <p className="text-xs text-blue-600 mt-1">
                    {member.role || "Team Member"}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-gray-500">
            No members assigned to this project.
          </p>

        )}

      </div>

            {/* Recent Tasks */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-bold">
            Recent Tasks
          </h2>

          <Link
            to={`/tasks?project=${project._id}`}
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>

        </div>

        {project.tasks && project.tasks.length > 0 ? (

          <div className="space-y-4">

            {project.tasks.slice(0, 5).map((task) => (

              <div
                key={task._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
              >

                <div>

                  <h3 className="font-semibold text-lg">
                    {task.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {task.description}
                  </p>

                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>

                  <span className="text-sm text-gray-500">
                    Due:
                    {" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </span>

                  <Link
                    to={`/tasks/${task._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View
                  </Link>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="text-center py-10">

            <p className="text-gray-500">
              No tasks available for this project.
            </p>

          </div>

        )}

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            to={`/projects/edit/${project._id}`}
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Edit Project
          </Link>

          <Link
            to={`/tasks/create?project=${project._id}`}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Add Task
          </Link>

          <Link
            to={`/assignments/create?project=${project._id}`}
            className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Assign Members
          </Link>

          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this project?"
                )
              ) {
                console.log("Delete Project:", project._id);

                // Example:
                // dispatch(deleteProject(project._id));
              }
            }}
            className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete Project
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProjectDetails;