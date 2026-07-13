import axios from "axios";


const API = axios.create({

    baseURL:"http://localhost:5000/api"

});



const config = ()=>({

headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}

});




// Get Projects

export const getProjectsAPI = async()=>{

const res = await API.get(
"/projects",
config()
);

return res.data;

};




// Get Single Project

export const getProjectByIdAPI = async(id)=>{

const res = await API.get(
`/projects/${id}`,
config()
);

return res.data;

};




// Create Project

export const createProjectAPI = async(data)=>{


const res = await API.post(
"/projects",
data,
config()
);


return res.data;


};




// Update Project

export const updateProjectAPI = async(id,data)=>{


const res = await API.put(

`/projects/${id}`,

data,

config()

);


return res.data;


};





// Delete Project

export const deleteProjectAPI = async(id)=>{


const res = await API.delete(

`/projects/${id}`,

config()

);


return res.data;


};