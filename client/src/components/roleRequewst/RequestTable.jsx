import React from "react";


const RequestTable = ({requests}) => {


return (

<div className="overflow-x-auto">


<table className="w-full bg-white shadow rounded-xl">


<thead>

<tr className="bg-gray-100">

<th className="p-3">
Name
</th>

<th>
Email
</th>

<th>
Requested Role
</th>

<th>
Status
</th>

<th>
Date
</th>

</tr>

</thead>



<tbody>


{
requests.map((request)=>(


<tr 
key={request._id}
className="border-b text-center"
>


<td className="p-3">
{request.name}
</td>


<td>
{request.email}
</td>


<td>
{request.role}
</td>


<td>

<span
className={`px-3 py-1 rounded-full text-sm

${
request.status==="Approved"
?
"bg-green-100 text-green-700"
:
request.status==="Rejected"
?
"bg-red-100 text-red-700"
:
"bg-yellow-100 text-yellow-700"

}

`}
>

{request.status}

</span>


</td>


<td>
{request.createdAt}
</td>


</tr>


))

}


</tbody>


</table>


</div>

)

}


export default RequestTable;