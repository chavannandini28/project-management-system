import axios from "axios";


const API=axios.create({

baseURL:"http://localhost:5000/api"

});


const config=()=>({

headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}

});



// Get requests

export const getRoleRequestsAPI=async()=>{


const response =
await API.get(
"/role-requests",
config()
);


return response.data;


};




// Update request

export const updateRoleRequestAPI=async(id,status)=>{


const response =
await API.put(

`/role-requests/${id}`,

{
status
},

config()

);


return response.data;


};