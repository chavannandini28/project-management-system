import React,{useEffect,useState} from "react";


import {

getProfileAPI,
updateProfileAPI

}

from "../api/userAPI";




const Profile=()=>{


const [user,setUser]=useState(null);



useEffect(()=>{


loadProfile();


},[]);




const loadProfile=async()=>{


const data =
await getProfileAPI();


setUser(data);


};





const update=async()=>{


await updateProfileAPI(user);


alert(
"Profile Updated"
);


};






if(!user)

return <h2>Loading...</h2>;






return(

<div className="
bg-white
rounded-xl
shadow
p-8
max-w-xl
">



<h1 className="
text-3xl
font-bold
mb-5
">

Profile

</h1>





<input

className="
border
p-3
w-full
mb-3
rounded
"

value={user.name}

onChange={
e=>
setUser({
...user,
name:e.target.value
})
}

/>




<input

className="
border
p-3
w-full
mb-3
rounded
"

value={user.email}

disabled

/>





<button

onClick={update}

className="
bg-blue-600
text-white
px-5
py-3
rounded
"

>

Update Profile

</button>




</div>

)

}


export default Profile;