import React,{useEffect,useState} from "react";

import {
useParams
}
from "react-router-dom";


import {
getProjectByIdAPI
}
from "../api/projectAPI";




const ProjectDetails=()=>{


const {id}=useParams();


const [project,setProject]=useState(null);




useEffect(()=>{


getProjectByIdAPI(id)

.then(data=>setProject(data));


},[]);






if(!project)

return <p>Loading...</p>;







return(

<div className="
bg-white
p-8
rounded-xl
shadow
">


<h1 className="
text-3xl
font-bold
">

{project.name}

</h1>



<p className="
mt-4
text-gray-600
">

{project.description}

</p>




<h2 className="
text-xl
font-bold
mt-6
">

Tasks

</h2>



{

project.tasks?.map(task=>(


<div

key={task._id}

className="
border
p-3
mt-2
rounded
"

>

{task.title}

</div>


))


}




</div>

)

}


export default ProjectDetails;