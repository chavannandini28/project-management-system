import React,{useState} from "react";


const EditProfile = ({user,onUpdate})=>{


const [form,setForm]=useState(user);



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

})

}



const submit=(e)=>{

e.preventDefault();

onUpdate(form);

}



return (

<form
onSubmit={submit}
className="bg-white p-6 rounded-xl shadow space-y-4"
>


<input

className="border p-3 rounded w-full"

name="name"

value={form.name}

onChange={handleChange}

/>



<input

className="border p-3 rounded w-full"

name="phone"

value={form.phone}

onChange={handleChange}

/>



<input

className="border p-3 rounded w-full"

name="department"

value={form.department}

onChange={handleChange}

/>



<button

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>

Update Profile

</button>


</form>

)

}


export default EditProfile;