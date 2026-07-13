import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
} from "react-icons/fa";

import SearchBar from "../common/SearchBar";
import Pagination from "../common/Pagination";

const ITEMS_PER_PAGE = 10;

const ProjectTable = ({
  projects = [],
  onDelete,
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [projects, search]);

  const totalPages = Math.ceil(
    filteredProjects.length / ITEMS_PER_PAGE
  );

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const statusBadge = (status) => {
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

  const priorityBadge = (priority) => {
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
    <div className="bg-white rounded-xl shadow-lg">

      {/* Header */}

      <div className="p-6 border-b">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <h2 className="text-2xl font-bold">
            Projects
          </h2>

          <div className="w-full md:w-80">

            <SearchBar
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              onClear={() => {
                setSearch("");
                setPage(1);
              }}
              placeholder="Search Project..."
            />

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Priority
              </th>

              <th className="px-6 py-4 text-left">
                Progress
              </th>

              <th className="px-6 py-4 text-left">
                Members
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

            {paginatedProjects.length > 0 ? (
              paginatedProjects.map((project) => {

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
                  <tr
                    key={project._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 font-semibold">
                      {project.name}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${statusBadge(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`text-white text-sm px-3 py-1 rounded-full ${priorityBadge(
                          project.priority
                        )}`}
                      >
                        {project.priority}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="w-40">

                        <div className="flex justify-between text-xs mb-1">

                          <span>{progress}%</span>

                        </div>

                        <div className="bg-gray-200 rounded-full h-2">

                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${progress}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <FaUsers />

                        {project.members?.length || 0}

                      </div>

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

                        <button
                          onClick={() =>
                            onDelete(project)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>

                <td
                  colSpan="7"
                  className="py-10 text-center text-gray-500"
                >
                  No Projects Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="p-6">

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </div>

    </div>
  );
};

export default ProjectTable;