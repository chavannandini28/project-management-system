import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaUserCircle,
  FaCog,
  FaClipboardList,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FaProjectDiagram />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
    {
      name: "Assignments",
      path: "/assignments",
      icon: <FaClipboardList />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
  ];

  if (user?.role === "admin") {
    navItems.push(
      {
        name: "Users",
        path: "/users",
        icon: <FaUsers />,
      },
      {
        name: "Role Requests",
        path: "/role-requests",
        icon: <FaUsers />,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: <FaCog />,
      }
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed lg:static z-50
          top-0 left-0
          h-screen
          w-64
          bg-white
          shadow-lg
          transform
          transition-transform
          duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}

        <div className="flex items-center justify-between px-6 py-5 border-b">

          <h1 className="text-2xl font-bold text-blue-600">
            PMS
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="mt-5">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`
              }
            >
              {item.icon}

              <span>{item.name}</span>

            </NavLink>
          ))}

        </nav>

      </aside>

      {/* Main */}

      <div className="flex-1 flex flex-col">

        {/* Navbar */}

        <header className="bg-white shadow h-16 flex justify-between items-center px-6">

          <div className="flex items-center gap-4">

            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={22} />
            </button>

            <h2 className="text-xl font-semibold">
              Project Management System
            </h2>

          </div>

          <div className="flex items-center gap-6">

            <button className="relative">

              <FaBell
                size={20}
                className="text-gray-600"
              />

              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex justify-center items-center">
                3
              </span>

            </button>

            <div className="flex items-center gap-3">

              <img
                src={
                  user?.avatar ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="hidden md:block">

                <h4 className="font-semibold">
                  {user?.name}
                </h4>

                <p className="text-sm text-gray-500">
                  {user?.role}
                </p>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              <FaSignOutAlt />

              Logout
            </button>

          </div>

        </header>

        {/* Page Content */}

        <main className="flex-1 p-6 overflow-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default MainLayout;