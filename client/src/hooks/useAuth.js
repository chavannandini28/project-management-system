import { useState, useEffect } from "react";

import {
    loginAPI,
    registerAPI
} from "../api/authAPI";



const useAuth = () => {


const [user,setUser] = useState(null);

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");





useEffect(()=>{


const storedUser = localStorage.getItem("user");


if(storedUser){

setUser(
JSON.parse(storedUser)
);

}


},[]);






// Login User

const login = async(credentials)=>{


try{


setLoading(true);

setError("");



const data = await loginAPI(credentials);



localStorage.setItem(
"token",
data.token
);



localStorage.setItem(
"user",
JSON.stringify(data.user)
);



setUser(data.user);



return data;



}

catch(err){


setError(

err.response?.data?.message ||
"Login Failed"

);


throw err;


}

finally{

setLoading(false);

}


};








// Register User

const register = async(userData)=>{


try{


setLoading(true);

setError("");



const data =
await registerAPI(userData);



return data;



}

catch(err){


setError(

err.response?.data?.message ||
"Registration Failed"

);



throw err;


}

finally{

setLoading(false);

}


};








// Logout

const logout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


setUser(null);


};







return{


user,

loading,

error,

login,

register,

logout,

isAuthenticated:!!user


};


};



export default useAuth;