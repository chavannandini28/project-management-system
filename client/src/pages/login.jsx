// import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";

import {loginAPI} from "../api/authAPI";


const Login = ()=>{


const navigate = useNavigate();



const [formData,setFormData]=useState({

email:"",
password:""

});



const [loading,setLoading]=useState(false);

const [error,setError]=useState("");





const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};






const handleSubmit=async(e)=>{

e.preventDefault();


setError("");



if(!formData.email || !formData.password){

setError(
"Please fill all fields"
);

return;

}



try{


setLoading(true);



const data = await loginAPI(formData);



/*
Expected response:

{
 token:"",
 user:{
   name:"",
   role:""
 }
}

*/


localStorage.setItem(
"token",
data.token
);



localStorage.setItem(
"user",
JSON.stringify(data.user)
);



navigate("/dashboard");



}
catch(error){


setError(

error.response?.data?.message ||
"Login failed"

);


}
finally{

setLoading(false);

}


};






return(


<div className="
min-h-screen 
flex 
items-center 
justify-center
bg-gray-100
">


<div className="
bg-white
w-full
max-w-md
p-8
rounded-xl
shadow-lg
">


<h1 className="
text-3xl
font-bold
text-center
mb-6
">

Login

</h1>



{
error &&

<div className="
bg-red-100
text-red-700
p-3
rounded
mb-4
">

{error}

</div>

}





<form
onSubmit={handleSubmit}
className="space-y-5"
>



<div>

<label className="font-medium">
Email
</label>


<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter email"

className="
w-full
border
p-3
rounded-lg
mt-1
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

/>


</div>





<div>


<label className="font-medium">

Password

</label>


<input

type="password"

name="password"

value={formData.password}

onChange={handleChange}

placeholder="Enter password"


className="
w-full
border
p-3
rounded-lg
mt-1
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

/>


</div>





<button

disabled={loading}

className="
w-full
bg-blue-600
text-white
py-3
rounded-lg
hover:bg-blue-700
transition
"

>


{
loading
?
"Logging in..."
:
"Login"

}


</button>




</form>





<p className="
text-center
mt-6
text-gray-600
">


Don't have an account?


<Link

to="/register"

className="
text-blue-600
ml-2
font-semibold
"

>

Register

</Link>


</p>





</div>


</div>


)


}



export default Login;