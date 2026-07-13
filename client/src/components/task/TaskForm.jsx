import React, { useState } from "react";


const TaskForm = ({ onSubmit }) => {

const [task,setTask]=useState({
    title:"",
    description:"",
    dueDate:"",
    priority:"Medium"
});


const handleChange=(e)=>{
    setTask({
        ...task,
        [e.target.name]:e.target.value
    })
}


const submitHandler=(e)=>{
    e.preventDefault();
    onSubmit(task);

    setTask({
        title:"",
        description:"",
        dueDate:"",
        priority:"Medium"
    })
}



return (

<form 
onSubmit={submitHandler}
className="bg-white p-6 rounded-xl shadow-md space-y-4"
>


<input
className="w-full border p-3 rounded"
name="title"
placeholder="Task Title"
value={task.title}
onChange={handleChange}
/>


<textarea
className="w-full border p-3 rounded"
name="description"
placeholder="Description"
value={task.description}
onChange={handleChange}
/>



<input
type="date"
className="w-full border p-3 rounded"
name="dueDate"
value={task.dueDate}
onChange={handleChange}
/>



<select
className="w-full border p-3 rounded"
name="priority"
value={task.priority}
onChange={handleChange}
>

<option>Low</option>
<option>Medium</option>
<option>High</option>

</select>



<button
className="bg-blue-600 text-white px-5 py-3 rounded-lg"
>
Create Task
</button>


</form>

)

}


export default TaskForm;