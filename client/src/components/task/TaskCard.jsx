import React from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition">

      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-gray-800">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            task.status === "Completed"
              ? "bg-green-100 text-green-600"
              : task.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {task.status}
        </span>
      </div>


      <p className="text-gray-600 mt-3">
        {task.description}
      </p>


      <div className="flex items-center gap-2 mt-4 text-gray-500">
        <FaUser />
        <span>{task.assignedTo || "Not Assigned"}</span>
      </div>


      <div className="flex items-center gap-2 mt-2 text-gray-500">
        <FaCalendarAlt />
        <span>{task.dueDate}</span>
      </div>

    </div>
  );
};


export default TaskCard;