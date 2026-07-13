import React,{useEffect,useState} from "react";

import {
useParams,
useNavigate
}
from "react-router-dom";


import {
getProjectByIdAPI,
updateProjectAPI
}
from "../api/projectAPI";





const EditProject=()=>{


const {id}=useParams();

const navigate=useNavigate();



const [form,setForm]=useState(null);






useEffect(()=>{


loadProject();


},[]);





const loadProject=async()=>{


const data=await getProjectByIdAPI(id);

setForm(data);


};





const change=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const submit=async(e)=>{


e.preventDefault();


await updateProjectAPI(
id,
form
);


navigate("/projects");


};







if(!form)

return <p>Loading...</p>;







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

Edit Project

</h1>




<input

name="name"

value={form.name}

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

value={form.description}

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


export default EditProject;