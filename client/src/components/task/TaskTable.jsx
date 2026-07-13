import React from "react";


const TaskTable = ({tasks}) => {


return (

<div className="overflow-x-auto">


<table className="w-full bg-white shadow rounded-xl">


<thead>

<tr className="bg-gray-100">

<th className="p-3">Title</th>
<th>Description</th>
<th>Status</th>
<th>Priority</th>
<th>Date</th>

</tr>

</thead>



<tbody>

{
tasks.map((task)=>(

<tr 
key={task._id}
className="border-b text-center"
>

<td className="p-3">
{task.title}
</td>


<td>
{task.description}
</td>


<td>
{task.status}
</td>


<td>
{task.priority}
</td>


<td>
{task.dueDate}
</td>


</tr>


))
}


</tbody>


</table>


</div>

)

}


export default TaskTable;