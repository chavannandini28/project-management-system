import React from "react";
import { useSelector } from "react-redux";
import {
  FaProjectDiagram,
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const Statistics = () => {
  const { projects = [] } = useSelector((state) => state.project);
  const { tasks = [] } = useSelector((state) => state.task);

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const activeProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const projectCompletion =
    projects.length > 0
      ? Math.round((completedProjects / projects.length) * 100)
      : 0;

  const taskCompletion =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  const statistics = [
    {
      title: "Completed Projects",
      value: completedProjects,
      total: projects.length,
      percentage: projectCompletion,
      icon: <FaProjectDiagram />,
      color: "bg-blue-500",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      total: projects.length,
      percentage:
        projects.length > 0
          ? Math.round((activeProjects / projects.length) * 100)
          : 0,
      icon: <FaClock />,
      color: "bg-orange-500",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      total: tasks.length,
      percentage: taskCompletion,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      total: tasks.length,
      percentage:
        tasks.length > 0
          ? Math.round((pendingTasks / tasks.length) * 100)
          : 0,
      icon: <FaTasks />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {statistics.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-5">

            <div>

              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
                <span className="text-lg text-gray-400">
                  {" "}
                  / {item.total}
                </span>
              </h2>

            </div>

            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl ${item.color}`}
            >
              {item.icon}
            </div>

          </div>

          {/* Progress */}

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className={`${item.color} h-3 rounded-full transition-all duration-500`}
              style={{
                width: `${item.percentage}%`,
              }}
            />

          </div>

          <div className="flex justify-between mt-3 text-sm">

            <span className="text-gray-500">
              Progress
            </span>

            <span className="font-semibold">
              {item.percentage}%
            </span>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;