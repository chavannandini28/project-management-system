import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaEnvelope,
  FaSearch,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b">

      <div className="flex items-center justify-between px-6 h-16">

        {/* Left Section */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars
              size={22}
              className="text-gray-700"
            />
          </button>

          {/* Search */}

          <div className="hidden md:flex relative">

            <FaSearch
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="
                w-80
                pl-10
                pr-4
                py-2
                rounded-lg
                border
                border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

        </div>

        {/* Right Section */}

        <div className="flex items-center gap-6">

          {/* Messages */}

          <button className="relative">

            <FaEnvelope
              size={20}
              className="text-gray-600 hover:text-blue-600"
            />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>

          </button>

          {/* Notifications */}

          <button className="relative">

            <FaBell
              size={20}
              className="text-gray-600 hover:text-blue-600"
            />

            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
              5
            </span>

          </button>

          {/* Profile */}

          <div className="relative">

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3"
            >

              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${
                    user?.name || "User"
                  }`
                }
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />

              <div className="hidden md:block text-left">

                <h4 className="font-semibold">
                  {user?.name || "User"}
                </h4>

                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || "Member"}
                </p>

              </div>

              <FaChevronDown />

            </button>

            {/* Dropdown */}

            {profileOpen && (

              <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border overflow-hidden">

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                >
                  <FaUser />

                  My Profile
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                >
                  <FaCog />

                  Settings
                </Link>

                <hr />

                <button
                  className="w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600"
                >
                  <FaSignOutAlt />

                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;