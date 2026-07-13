import React,{useEffect,useState} from "react";


import {

getRoleRequestsAPI,
updateRoleRequestAPI

}

from "../api/roleRequestAPI";




const RoleRequests=()=>{


const [requests,setRequests]=useState([]);





useEffect(()=>{


loadRequests();


},[]);





const loadRequests=async()=>{


const data =
await getRoleRequestsAPI();


setRequests(data);


};





const updateStatus=async(id,status)=>{


await updateRoleRequestAPI(
id,
status
);


loadRequests();


};







return(

<div>


<h1 className="
text-3xl
font-bold
mb-6
">

Role Requests

</h1>





<div className="
bg-white
rounded-xl
shadow
overflow-hidden
">


<table className="w-full">


<thead>

<tr className="bg-gray-100">

<th className="p-3">
User
</th>

<th>
Requested Role
</th>

<th>
Status
</th>

<th>
Action
</th>

</tr>

</thead>



<tbody>



{

requests.map(request=>(


<tr
key={request._id}
className="border-b text-center"
>


<td className="p-3">

{request.name}

</td>



<td>

{request.role}

</td>




<td>

{request.status}

</td>




<td>


<button

onClick={()=>updateStatus(
request._id,
"Approved"
)}

className="
bg-green-600
text-white
px-3
py-2
rounded
mr-2
"

>

Approve

</button>




<button

onClick={()=>updateStatus(
request._id,
"Rejected"
)}

className="
bg-red-600
text-white
px-3
py-2
rounded
"

>

Reject

</button>


</td>



</tr>


))


}




</tbody>



</table>



</div>


</div>

)

}


export default RoleRequests;