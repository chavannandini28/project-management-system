import axios from "axios";


const API = axios.create({

    baseURL:"http://localhost:5000/api"

});



// Attach token automatically

API.interceptors.request.use((config)=>{


    const token = localStorage.getItem("token");


    if(token){

        config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;


});





// =======================
// REGISTER
// =======================

export const registerAPI = async(data)=>{


    const response = await API.post(
        "/auth/register",
        data
    );


    return response;


};





// =======================
// LOGIN
// =======================

export const loginAPI = async(data)=>{


    const response = await API.post(
        "/auth/login",
        data
    );


    return response;


};





// =======================
// GET PROFILE
// =======================

export const getProfileAPI = async()=>{


    const response = await API.get(
        "/auth/profile"
    );


    return response;


};







// =======================
// UPDATE PROFILE
// =======================

export const updateProfileAPI = async(data)=>{


    const response = await API.put(
        "/auth/profile",
        data
    );


    return response;


};





export default API;