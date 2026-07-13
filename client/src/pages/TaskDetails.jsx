import React,{useEffect,useState} from "react";

import {
useParams
}
from "react-router-dom";


import {
getTaskByIdAPI,
addCommentAPI
}
from "../api/taskAPI";



const TaskDetails=()=>{


const {id}=useParams();



const [task,setTask]=useState(null);


const [comment,setComment]=useState("");




useEffect(()=>{

loadTask();

},[]);





const loadTask=async()=>{


const data =
await getTaskByIdAPI(id);


setTask(data);


};





const addComment=async()=>{


await addCommentAPI(
id,
comment
);


setComment("");

loadTask();


};






if(!task)

return <h2>Loading...</h2>;







return(

<div className="
bg-white
p-8
rounded-xl
shadow
">


<h1 className="
text-3xl
font-bold
">

{task.title}

</h1>



<p className="
mt-3
text-gray-600
">

{task.description}

</p>





<div className="mt-5">

Status:

<span className="
ml-2
bg-blue-100
px-3
py-1
rounded
">

{task.status}

</span>


</div>







<h2 className="
text-xl
font-bold
mt-8
">

Comments

</h2>





{

task.comments?.map((c,index)=>(


<div

key={index}

className="
bg-gray-100
p-3
rounded
mt-2
"

>

{c.comment}

</div>


))

}







<div className="
flex
gap-3
mt-5
">


<input

value={comment}

onChange={
e=>setComment(e.target.value)
}

placeholder="Add comment"

className="
border
p-3
flex-1
rounded
"

/>



<button

onClick={addComment}

className="
bg-blue-600
text-white
px-5
rounded
"

>

Add

</button>



</div>





</div>

)

}


export default TaskDetails;