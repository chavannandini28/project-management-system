import React from "react";
import { Link } from "react-router-dom";
import {
  FaProjectDiagram,
  FaCalendarAlt,
  FaUsers,
  FaEye,
  FaEdit,
} from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
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

  const getPriorityColor = (priority) => {
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

  const progress =
    project.progress ??
    (project.totalTasks
      ? Math.round(
          ((project.completedTasks || 0) /
            project.totalTasks) *
            100
        )
      : 0);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Header */}

      <div className="flex justify-between items-center p-5 border-b">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">

            <FaProjectDiagram
              size={22}
              className="text-blue-600"
            />

          </div>

          <div>

            <h2 className="font-bold text-lg">
              {project.name}
            </h2>

            <p className="text-sm text-gray-500">
              {project.category || "General"}
            </p>

          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>

      </div>

      {/* Body */}

      <div className="p-5">

        <p className="text-gray-600 line-clamp-3">
          {project.description ||
            "No description available."}
        </p>

        {/* Progress */}

        <div className="mt-5">

          <div className="flex justify-between text-sm mb-2">

            <span>Progress</span>

            <span className="font-semibold">
              {progress}%
            </span>

          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">

            <div
              className="h-3 bg-blue-600 rounded-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Info */}

        <div className="mt-5 space-y-3">

          <div className="flex items-center gap-3 text-gray-600">

            <FaCalendarAlt />

            <span>
              {project.endDate
                ? new Date(
                    project.endDate
                  ).toLocaleDateString()
                : "No Deadline"}
            </span>

          </div>

          <div className="flex items-center gap-3 text-gray-600">

            <FaUsers />

            <span>
              {project.members?.length || 0} Members
            </span>

          </div>

        </div>

        {/* Priority */}

        <div className="mt-5 flex items-center gap-3">

          <span className="font-medium">
            Priority:
          </span>

          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${getPriorityColor(
              project.priority
            )}`}
          >
            {project.priority}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t p-4 flex justify-end gap-3">

        <Link
          to={`/projects/${project._id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <FaEye />

          View
        </Link>

        <Link
          to={`/projects/edit/${project._id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          <FaEdit />

          Edit
        </Link>

      </div>

    </div>
  );
};

export default ProjectCard;