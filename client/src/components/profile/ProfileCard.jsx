import React from "react";
import { FaUser } from "react-icons/fa";


const ProfileCard = ({user}) => {


return (

<div className="bg-white shadow-lg rounded-xl p-6">


<div className="flex items-center gap-5">


<img

src={
user.profileImage ||
"https://via.placeholder.com/100"
}

className="w-24 h-24 rounded-full object-cover"

/>


<div>

<h2 className="text-2xl font-bold">

{user.name}

</h2>


<p className="text-gray-500">

{user.email}

</p>


<p className="mt-2">

Role : {user.role}

</p>


</div>


</div>



<div className="mt-6 space-y-2">


<p>
<b>Phone:</b> {user.phone}
</p>


<p>
<b>Department:</b> {user.department}
</p>


<p>
<b>Joined:</b> {user.createdAt}
</p>


</div>



</div>

)

}


export default ProfileCard;