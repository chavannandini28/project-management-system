import React,{useState} from "react";


const AssignTaskModal = ({
open,
closeModal,
assignTask,
users,
task
})=>{


const [user,setUser]=useState("");



if(!open)
return null;



const submitHandler=(e)=>{

e.preventDefault();

assignTask({
taskId:task._id,
user
});

closeModal();

}



return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">


<div className="bg-white p-6 rounded-xl w-96">


<h2 className="text-xl font-bold mb-4">
Assign Task
</h2>



<form onSubmit={submitHandler}>


<select

className="w-full border p-3 rounded"

value={user}

onChange={(e)=>setUser(e.target.value)}

>


<option>
Select User
</option>


{
users.map(u=>(

<option 
key={u._id}
value={u._id}
>

{u.name}

</option>

))

}


</select>




<div className="flex justify-end gap-3 mt-5">


<button

type="button"

onClick={closeModal}

className="px-4 py-2 border rounded"

>

Cancel

</button>



<button

className="bg-blue-600 text-white px-4 py-2 rounded"

>

Assign

</button>



</div>



</form>


</div>


</div>

)

}


export default AssignTaskModal;