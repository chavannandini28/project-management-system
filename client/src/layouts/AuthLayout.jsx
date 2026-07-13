import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 text-white p-12 flex-col justify-center">

        <div className="flex items-center gap-3 mb-8">
          <FaTasks size={42} />
          <h1 className="text-4xl font-bold">
            Project Management System
          </h1>
        </div>

        <h2 className="text-3xl font-semibold mb-6">
          Manage your projects efficiently.
        </h2>

        <p className="text-lg text-blue-100 leading-8">
          Collaborate with your team, assign tasks, monitor project
          progress, and increase productivity using one modern dashboard.
        </p>

        <div className="mt-10">
          <ul className="space-y-4 text-lg">
            <li>✅ Project Management</li>
            <li>✅ Task Assignment</li>
            <li>✅ Team Collaboration</li>
            <li>✅ Progress Tracking</li>
            <li>✅ Role Management</li>
          </ul>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center p-6">

        <div className="w-full max-w-md">

          {/* Logo */}

          <div className="text-center mb-8">

            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <FaTasks
                size={34}
                className="text-blue-600"
              />

              <h2 className="text-3xl font-bold text-gray-800">
                PMS
              </h2>

            </Link>

            <p className="text-gray-500 mt-3">
              Welcome to Project Management System
            </p>

          </div>

          {/* Login/Register Pages */}

          <div className="bg-white rounded-xl shadow-xl p-8">

            <Outlet />

          </div>

          <p className="text-center text-gray-500 mt-6 text-sm">
            © {new Date().getFullYear()} Project Management System
          </p>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;