import React from "react";


const TaskStatus = ({status,onChange}) => {


return (

<select

value={status}

onChange={(e)=>onChange(e.target.value)}

className="border rounded px-3 py-2"

>


<option>
Pending
</option>


<option>
In Progress
</option>


<option>
Completed
</option>


</select>

)

}


export default TaskStatus;