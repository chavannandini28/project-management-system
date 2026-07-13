import React from "react";
import { useSelector } from "react-redux";
import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaClock,
} from "react-icons/fa";

const DashboardCards = () => {
  const { projects = [] } = useSelector((state) => state.project);
  const { tasks = [] } = useSelector((state) => state.task);
  const { users = [] } = useSelector((state) => state.user);

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const cards = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: <FaProjectDiagram size={28} />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: <FaTasks size={28} />,
      bg: "bg-green-500",
    },
    {
      title: "Team Members",
      value: users.length,
      icon: <FaUsers size={28} />,
      bg: "bg-purple-500",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: <FaClock size={28} />,
      bg: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${card.bg}`}
            >
              {card.icon}
            </div>
          </div>

          <div className="mt-5">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${card.bg} h-2 rounded-full`}
                style={{
                  width: `${Math.min(card.value * 10, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;