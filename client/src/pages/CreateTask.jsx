import React,{useState} from "react";

import {
useNavigate
}
from "react-router-dom";


import {
createTaskAPI
}
from "../api/taskAPI";



const CreateTask=()=>{


const navigate=useNavigate();



const [task,setTask]=useState({

title:"",
description:"",
priority:"Medium",
dueDate:"",
status:"Pending",
assignedTo:""

});





const change=(e)=>{

setTask({

...task,

[e.target.name]:
e.target.value

});


};






const submit=async(e)=>{


e.preventDefault();


await createTaskAPI(task);


navigate("/tasks");


};






return(

<form

onSubmit={submit}

className="
bg-white
p-8
rounded-xl
shadow
max-w-xl
space-y-4
"

>


<h1 className="
text-3xl
font-bold
">

Create Task

</h1>




<input

name="title"

placeholder="Task title"

onChange={change}

className="
border
p-3
w-full
rounded
"

/>



<textarea

name="description"

placeholder="Description"

onChange={change}

className="
border
p-3
w-full
rounded
"

/>





<select

name="priority"

onChange={change}

className="
border
p-3
w-full
rounded
"

>


<option>
Low
</option>


<option>
Medium
</option>


<option>
High
</option>


</select>





<input

type="date"

name="dueDate"

onChange={change}

className="
border
p-3
w-full
rounded
"

/>





<button

className="
bg-blue-600
text-white
px-5
py-3
rounded
"

>

Create Task

</button>



</form>

)

}



export default CreateTask;