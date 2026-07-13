import axios from "axios";


const API = axios.create({

baseURL:"http://localhost:5000/api"

});


const config=()=>({

headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}

});


// Get users

export const getUsersAPI=async()=>{

const response =
await API.get(
"/users",
config()
);

return response.data;

};



// Get profile

export const getProfileAPI=async()=>{


const response =
await API.get(
"/users/profile",
config()
);


return response.data;


};




// Update profile

export const updateProfileAPI=async(data)=>{


const response =
await API.put(
"/users/profile",
data,
config()
);


return response.data;


};