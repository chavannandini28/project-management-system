import React from "react";
import { FaUserClock } from "react-icons/fa";

const RequestCard = ({ request, onApprove, onReject }) => {

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border">

      <div className="flex items-center gap-3">

        <div className="bg-blue-100 p-3 rounded-full">
          <FaUserClock className="text-blue-600 text-xl"/>
        </div>


        <div>
          <h3 className="font-bold text-lg">
            {request.name}
          </h3>

          <p className="text-gray-500">
            {request.email}
          </p>
        </div>

      </div>



      <div className="mt-4">

        <p>
          <b>Requested Role:</b> {request.role}
        </p>

        <p>
          <b>Status:</b> {request.status}
        </p>

      </div>



      {
        request.status === "Pending" &&

        <div className="flex gap-3 mt-5">


          <button
          onClick={()=>onApprove(request._id)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Approve
          </button>



          <button
          onClick={()=>onReject(request._id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Reject
          </button>


        </div>

      }


    </div>
  );
};


export default RequestCard;