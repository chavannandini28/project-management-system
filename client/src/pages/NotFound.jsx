import React from "react";

import {
Link
}
from "react-router-dom";



const NotFound=()=>{


return(

<div className="
min-h-screen
flex
flex-col
items-center
justify-center
">


<h1 className="
text-7xl
font-bold
text-red-600
">

404

</h1>



<p className="
text-xl
mt-4
">

Page Not Found

</p>




<Link

to="/dashboard"

className="
mt-6
bg-blue-600
text-white
px-5
py-3
rounded
"

>

Go Dashboard

</Link>



</div>

)

}



export default NotFound;