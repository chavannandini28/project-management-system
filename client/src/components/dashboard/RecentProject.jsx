import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaFolderOpen,
} from "react-icons/fa";

const RecentProjects = () => {
  const { projects = [], loading } = useSelector(
    (state) => state.project
  );

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

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
        return "text-red-600";

      case "Medium":
        return "text-yellow-600";

      case "Low":
        return "text-green-600";

      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-center text-gray-500">
          Loading Projects...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      {/* Header */}

      <div className="flex justify-between items-center px-6 py-5 border-b">

        <div className="flex items-center gap-3">

          <FaFolderOpen
            size={24}
            className="text-blue-600"
          />

          <h2 className="text-xl font-bold">
            Recent Projects
          </h2>

        </div>

        <Link
          to="/projects"
          className="text-blue-600 hover:underline font-medium"
        >
          View All
        </Link>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Project
              </th>

              <th className="px-6 py-4 text-left">
                Manager
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Priority
              </th>

              <th className="px-6 py-4 text-left">
                Deadline
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium">
                    {project.name}
                  </td>

                  <td className="px-6 py-4">
                    {project.manager?.name ||
                      project.createdBy?.name ||
                      "N/A"}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>

                  </td>

                  <td
                    className={`px-6 py-4 font-semibold ${getPriorityColor(
                      project.priority
                    )}`}
                  >
                    {project.priority}
                  </td>

                  <td className="px-6 py-4">
                    {project.endDate
                      ? new Date(
                          project.endDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/projects/${project._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </Link>

                      <Link
                        to={`/projects/edit/${project._id}`}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit />
                      </Link>

                    </div>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No Projects Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentProjects;