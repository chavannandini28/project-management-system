import React, {useState} from "react";


const TaskComments = ({comments=[],addComment}) => {


const [comment,setComment]=useState("");



const submit=(e)=>{

e.preventDefault();

if(comment.trim()){

addComment(comment);

setComment("");

}

}



return (

<div className="mt-5">


<h3 className="font-bold text-lg">
Comments
</h3>



<div className="space-y-2 mt-3">


{
comments.map((c,index)=>(

<div
key={index}
className="bg-gray-100 p-3 rounded"
>

{c}

</div>

))

}


</div>



<form 
onSubmit={submit}
className="flex gap-2 mt-4"
>


<input

className="border flex-1 p-2 rounded"

value={comment}

onChange={(e)=>setComment(e.target.value)}

placeholder="Add comment"

/>



<button

className="bg-blue-600 text-white px-4 rounded"

>

Send

</button>



</form>


</div>

)

}


export default TaskComments;