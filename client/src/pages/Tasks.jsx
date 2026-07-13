import React,{useEffect,useState} from "react";

import {
Link
}
from "react-router-dom";


import {
getTasksAPI,
deleteTaskAPI
}
from "../api/taskAPI";



const Tasks=()=>{


const [tasks,setTasks]=useState([]);

const [loading,setLoading]=useState(true);




useEffect(()=>{

loadTasks();

},[]);




const loadTasks=async()=>{


try{

const data =
await getTasksAPI();

setTasks(data);

}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}


};






const deleteTask=async(id)=>{


if(
!window.confirm(
"Delete task?"
)
)
return;



await deleteTaskAPI(id);


loadTasks();


};





if(loading)

return <h2>Loading Tasks...</h2>;







return(

<div className="space-y-6">



<div className="
flex
justify-between
items-center
">


<h1 className="
text-3xl
font-bold
">

Tasks

</h1>



<Link

to="/create-task"

className="
bg-blue-600
text-white
px-5
py-3
rounded-lg
"

>

+ Create Task

</Link>


</div>








<div className="
grid
md:grid-cols-3
gap-6
">



{

tasks.map(task=>(


<div

key={task._id}

className="
bg-white
rounded-xl
shadow
p-5
"

>


<h2 className="
font-bold
text-xl
">

{task.title}

</h2>




<p className="
text-gray-600
mt-2
">

{task.description}

</p>




<div className="mt-3">


<span className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
">

{task.status}

</span>


</div>





<div className="
flex
gap-2
mt-5
">


<Link

to={`/tasks/${task._id}`}

className="
bg-green-600
text-white
px-3
py-2
rounded
"

>

View

</Link>



<Link

to={`/edit-task/${task._id}`}

className="
bg-yellow-500
text-white
px-3
py-2
rounded
"

>

Edit

</Link>



<button

onClick={()=>deleteTask(task._id)}

className="
bg-red-600
text-white
px-3
py-2
rounded
"

>

Delete

</button>



</div>


</div>


))


}



</div>



</div>

)

}


export default Tasks;