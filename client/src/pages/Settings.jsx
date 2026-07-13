import React,{useState} from "react";


const Settings=()=>{


const [dark,setDark]=useState(false);



return(

<div className="
bg-white
p-8
rounded-xl
shadow
max-w-xl
">


<h1 className="
text-3xl
font-bold
mb-6
">

Settings

</h1>




<div className="
flex
justify-between
items-center
">


<p>
Dark Mode
</p>



<button

onClick={()=>setDark(!dark)}

className="
bg-blue-600
text-white
px-4
py-2
rounded
"

>


{
dark
?
"ON"
:
"OFF"
}


</button>



</div>




</div>

)

}


export default Settings;