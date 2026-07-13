import React,{useEffect,useState} from "react";

import {
getUsersAPI
}
from "../api/userAPI";



const Users=()=>{


const [users,setUsers]=useState([]);




useEffect(()=>{


getUsersAPI()

.then(data=>setUsers(data));


},[]);







return(

<div>


<h1 className="
text-3xl
font-bold
mb-6
">

Users

</h1>




<div className="
grid
md:grid-cols-3
gap-5
">



{

users.map(user=>(


<div

key={user._id}

className="
bg-white
shadow
rounded-xl
p-5
"

>


<h2 className="
font-bold
text-xl
">

{user.name}

</h2>



<p>

{user.email}

</p>



<p className="
mt-2
text-blue-600
">

{user.role}

</p>



</div>


))


}



</div>



</div>

)

}


export default Users;