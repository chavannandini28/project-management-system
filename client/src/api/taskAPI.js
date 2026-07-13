import axios from "axios";


const API = axios.create({

baseURL:"http://localhost:5000/api"

});



const config = ()=>({

headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}

});




// Get all tasks

export const getTasksAPI = async()=>{

const response =
await API.get(
"/tasks",
config()
);

return response.data;

};




// Get single task

export const getTaskByIdAPI = async(id)=>{

const response =
await API.get(
`/tasks/${id}`,
config()
);

return response.data;

};




// Create task

export const createTaskAPI = async(data)=>{

const response =
await API.post(
"/tasks",
data,
config()
);

return response.data;

};




// Update task

export const updateTaskAPI = async(id,data)=>{

const response =
await API.put(
`/tasks/${id}`,
data,
config()
);

return response.data;

};




// Delete task

export const deleteTaskAPI = async(id)=>{

const response =
await API.delete(
`/tasks/${id}`,
config()
);

return response.data;

};




// Add comment

export const addCommentAPI = async(id,comment)=>{


const response =
await API.post(

`/tasks/${id}/comments`,

{
comment
},

config()

);


return response.data;


};