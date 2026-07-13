import React,{useState} from "react";

import {
useNavigate
}
from "react-router-dom";


import {
createProjectAPI
}
from "../api/projectAPI";




const CreateProject=()=>{


const navigate=useNavigate();



const [form,setForm]=useState({

name:"",
description:"",
startDate:"",
endDate:"",
status:"Planning"

});





const change=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};





const submit=async(e)=>{


e.preventDefault();


await createProjectAPI(form);


navigate("/projects");


};






return(

<div className="
max-w-xl
bg-white
p-8
rounded-xl
shadow
">


<h1 className="
text-3xl
font-bold
mb-6
">

Create Project

</h1>




<form
onSubmit={submit}
className="space-y-4"
>


<input

name="name"

placeholder="Project Name"

className="border p-3 w-full rounded"

onChange={change}

/>



<textarea

name="description"

placeholder="Description"

className="border p-3 w-full rounded"

onChange={change}

/>




<input

type="date"

name="startDate"

className="border p-3 w-full rounded"

onChange={change}

/>




<input

type="date"

name="endDate"

className="border p-3 w-full rounded"

onChange={change}

/>




<select

name="status"

className="border p-3 w-full rounded"

onChange={change}

>


<option>
Planning
</option>


<option>
Running
</option>


<option>
Completed
</option>


</select>






<button

className="
bg-blue-600
text-white
px-5
py-3
rounded
"

>

Create Project

</button>



</form>


</div>

)


}


export default CreateProject;