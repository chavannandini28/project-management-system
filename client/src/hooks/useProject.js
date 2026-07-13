import {useState,useEffect} from "react";


import {

getProjectsAPI,
createProjectAPI,
updateProjectAPI,
deleteProjectAPI

}

from "../api/projectAPI";




const useProjects=()=>{


const [projects,setProjects]=useState([]);

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");







const fetchProjects=async()=>{


try{


setLoading(true);


const data =
await getProjectsAPI();


setProjects(data);



}

catch(err){


setError(
"Unable to fetch projects"
);


}

finally{

setLoading(false);

}


};







useEffect(()=>{


fetchProjects();


},[]);









const createProject=async(data)=>{


try{


const newProject =
await createProjectAPI(data);



setProjects([

...projects,

newProject

]);



return newProject;


}

catch(err){


setError(
"Project creation failed"
);


}


};








const updateProject=async(id,data)=>{


try{


const updated =
await updateProjectAPI(
id,
data
);



setProjects(

projects.map(project=>

project._id===id

?

updated

:

project

)

);



return updated;


}

catch(err){


setError(
"Update failed"
);


}


};










const deleteProject=async(id)=>{


try{


await deleteProjectAPI(id);



setProjects(

projects.filter(

project=>

project._id!==id

)

);



}


catch(err){


setError(
"Delete failed"
);


}


};







return{


projects,

loading,

error,

fetchProjects,

createProject,

updateProject,

deleteProject


};


};


export default useProjects;