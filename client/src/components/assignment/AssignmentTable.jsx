import React from "react";


const AssignmentTable = ({assignments}) => {


return (

<table className="w-full bg-white shadow rounded-xl">


<thead>

<tr className="bg-gray-100">

<th className="p-3">
Task
</th>

<th>
Assigned User
</th>

<th>
Role
</th>

<th>
Status
</th>

</tr>

</thead>



<tbody>


{
assignments.map((item)=>(


<tr 
key={item._id}
className="border-b text-center"
>


<td className="p-3">
{item.task}
</td>


<td>
{item.user}
</td>


<td>
{item.role}
</td>


<td>
{item.status}
</td>


</tr>


))

}



</tbody>



</table>

)

}


export default AssignmentTable;