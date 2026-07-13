import React,{useEffect,useState} from "react";

import {
useNavigate,
useParams
}
from "react-router-dom";


import {
getTaskByIdAPI,
updateTaskAPI
}
from "../api/taskAPI";




const EditTask=()=>{


const {id}=useParams();

const navigate=useNavigate();


const [task,setTask]=useState(null);




useEffect(()=>{

loadTask();

},[]);




const loadTask=async()=>{

const data =
await getTaskByIdAPI(id);

setTask(data);

};





const change=(e)=>{


setTask({

...task,

[e.target.name]:
e.target.value

});


};





const submit=async(e)=>{


e.preventDefault();


await updateTaskAPI(
id,
task
);


navigate("/tasks");


};





if(!task)

return <h2>Loading...</h2>;






return(

<form

onSubmit={submit}

className="
bg-white
p-8
shadow
rounded-xl
max-w-xl
space-y-4
"

>


<h1 className="
text-3xl
font-bold
">

Edit Task

</h1>



<input

name="title"

value={task.title}

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

value={task.description}

onChange={change}

className="
border
p-3
w-full
rounded
"

/>





<select

name="status"

value={task.status}

onChange={change}

className="
border
p-3
w-full
rounded
"

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




<button

className="
bg-green-600
text-white
px-5
py-3
rounded
"

>

Update

</button>



</form>

)

}



export default EditTask;