import React,{useState} from "react";

import {
Link,
useNavigate
}
from "react-router-dom";


import {
registerAPI
}
from "../api/authAPI";

import "../styles/login.css";




const Register = ()=>{


const navigate=useNavigate();



const [formData,setFormData]=useState({

name:"",
email:"",
password:"",
confirmPassword:""

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



if(
!formData.name ||
!formData.email ||
!formData.password ||
!formData.confirmPassword
){

setError(
"All fields are required"
);

return;

}




if(
formData.password !== 
formData.confirmPassword
){

setError(
"Passwords do not match"
);

return;

}





try{


setLoading(true);



await registerAPI({

name:formData.name,

email:formData.email,

password:formData.password

});



navigate("/login");



}

catch(error){


setError(

error.response?.data?.message ||
"Registration failed"

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
max-w-md
w-full
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

Create Account

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

className="
space-y-4
"

>




<input

type="text"

name="name"

placeholder="Full Name"

value={formData.name}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

/>





<input

type="email"

name="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

/>






<input

type="password"

name="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

/>






<input

type="password"

name="confirmPassword"

placeholder="Confirm Password"

value={formData.confirmPassword}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

/>







<button

disabled={loading}

className="
w-full
bg-green-600
text-white
py-3
rounded-lg
hover:bg-green-700
"

>


{

loading
?
"Creating..."
:
"Register"

}


</button>



</form>







<p className="
text-center
mt-5
text-gray-600
">


Already have account?


<Link

to="/login"

className="
text-blue-600
font-semibold
ml-2
"

>

Login

</Link>


</p>





</div>



</div>


)

}



export default Register;