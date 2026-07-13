import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaChevronRight,
} from "react-icons/fa";

const DashboardLayout = () => {
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const pathnames = location.pathname
    .split("/")
    .filter((item) => item);

  const getPageTitle = () => {
    if (pathnames.length === 0) return "Dashboard";

    return pathnames[pathnames.length - 1]
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="min-h-full">

      {/* Header */}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <FaHome />
            Dashboard
          </Link>

          {pathnames.map((path, index) => {
            const route = "/" + pathnames.slice(0, index + 1).join("/");

            return (
              <React.Fragment key={route}>
                <FaChevronRight size={10} />

                <Link
                  to={route}
                  className="hover:text-blue-600 capitalize"
                >
                  {path.replace("-", " ")}
                </Link>
              </React.Fragment>
            );
          })}

        </div>

        {/* Page Title */}

        <div className="mt-4">

          <h1 className="text-3xl font-bold text-gray-800">
            {getPageTitle()}
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back,
            <span className="font-semibold text-blue-600">
              {" "}
              {user?.name}
            </span>
          </p>

        </div>

      </div>

      {/* Dashboard Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-gray-500 text-sm">
            Total Projects
          </h4>

          <h2 className="text-3xl font-bold mt-2">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-gray-500 text-sm">
            Total Tasks
          </h4>

          <h2 className="text-3xl font-bold mt-2">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-gray-500 text-sm">
            Team Members
          </h4>

          <h2 className="text-3xl font-bold mt-2">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-gray-500 text-sm">
            Pending Tasks
          </h4>

          <h2 className="text-3xl font-bold mt-2">
            --
          </h2>
        </div>

      </div>

      {/* Child Pages */}

      <div className="bg-white rounded-xl shadow p-6">

        <Outlet />

      </div>

    </div>
  );
};

export default DashboardLayout;