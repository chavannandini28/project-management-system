import React,{useEffect,useState} from "react";

import {
Link
}
from "react-router-dom";


import {
getProjectsAPI,
deleteProjectAPI
}
from "../api/projectAPI";



const Projects=()=>{


const [projects,setProjects]=useState([]);

const [loading,setLoading]=useState(true);



useEffect(()=>{

loadProjects();

},[]);





const loadProjects=async()=>{


try{

const data=await getProjectsAPI();

setProjects(data);


}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};





const deleteProject=async(id)=>{


if(!window.confirm(
"Delete Project?"
))
return;


await deleteProjectAPI(id);


loadProjects();


};






if(loading)

return <h2>Loading Projects...</h2>;






return(

<div className="space-y-6">


<div className="
flex
justify-between
items-center
">


<h1 className="
text-3xl
font-bold
">

Projects

</h1>



<Link

to="/create-project"

className="
bg-blue-600
text-white
px-5
py-3
rounded-lg
"

>

+ Create Project

</Link>


</div>







<div className="
grid
md:grid-cols-3
gap-6
">



{

projects.length===0?


<p>
No Projects Found
</p>



:


projects.map(project=>(


<div

key={project._id}

className="
bg-white
rounded-xl
shadow
p-5
"


>


<h2 className="
text-xl
font-bold
">

{project.name}

</h2>



<p className="
text-gray-500
mt-2
">

{project.description}

</p>



<div className="
flex
gap-3
mt-5
">


<Link

to={`/projects/${project._id}`}

className="
bg-green-600
text-white
px-3
py-2
rounded
"

>

View

</Link>



<Link

to={`/edit-project/${project._id}`}

className="
bg-yellow-500
text-white
px-3
py-2
rounded
"

>

Edit

</Link>




<button

onClick={()=>deleteProject(project._id)}

className="
bg-red-600
text-white
px-3
py-2
rounded
"

>

Delete

</button>


</div>


</div>


))


}



</div>


</div>

)

}


export default Projects;