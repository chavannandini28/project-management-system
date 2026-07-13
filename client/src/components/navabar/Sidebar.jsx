import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTimes,
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaClipboardList,
  FaUsers,
  FaUserCircle,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

import { logout } from "../../redux/auth/authSlice";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      title: "Projects",
      icon: <FaProjectDiagram />,
      path: "/projects",
    },
    {
      title: "Tasks",
      icon: <FaTasks />,
      path: "/tasks",
    },
    {
      title: "Assignments",
      icon: <FaClipboardList />,
      path: "/assignments",
    },
    {
      title: "Profile",
      icon: <FaUserCircle />,
      path: "/profile",
    },
  ];

  const adminItems = [
    {
      title: "Users",
      icon: <FaUsers />,
      path: "/users",
    },
    {
      title: "Role Requests",
      icon: <FaUserShield />,
      path: "/role-requests",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-64
          bg-white
          shadow-xl
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}

        <div className="flex justify-between items-center p-5 border-b">

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

        {/* User */}

        <div className="flex flex-col items-center py-6 border-b">

          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.name || "User"}`
            }
            alt="User"
            className="w-20 h-20 rounded-full border-4 border-blue-500"
          />

          <h2 className="mt-4 font-semibold text-lg">
            {user?.name || "User"}
          </h2>

          <span className="text-gray-500 capitalize">
            {user?.role || "Member"}
          </span>

        </div>

        {/* Menu */}

        <nav className="mt-4">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              {item.icon}

              <span>{item.title}</span>

            </NavLink>
          ))}

          {user?.role === "admin" && (
            <>
              <div className="mt-6 mb-2 px-6 text-xs uppercase text-gray-400 font-semibold">
                Administration
              </div>

              {adminItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-4 transition-all ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  {item.icon}

                  <span>{item.title}</span>

                </NavLink>
              ))}
            </>
          )}

        </nav>

        {/* Logout */}

        <div className="absolute bottom-0 w-full p-5 border-t">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
          >
            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;