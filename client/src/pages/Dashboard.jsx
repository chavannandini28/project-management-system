import React,{useEffect,useState} from "react";

import {
FaProjectDiagram,
FaTasks,
FaCheckCircle,
FaClock
}
from "react-icons/fa";


import PieChart from "../components/charts/PieChart";

import BarChart from "../components/charts/BarChart";


import {
getDashboardStats
}
from "../api/dashboardAPI";





const Dashboard = ()=>{



const [stats,setStats]=useState({

projects:0,
tasks:0,
completed:0,
pending:0,
recentTasks:[],
recentProjects:[]

});



const [loading,setLoading]=useState(true);



const [error,setError]=useState("");






useEffect(()=>{


fetchDashboard();


},[]);







const fetchDashboard=async()=>{


try{


setLoading(true);


const data = await getDashboardStats();



setStats(data);



}

catch(err){


setError(
"Failed to load dashboard"
);


}

finally{

setLoading(false);

}


};









const cards=[


{

title:"Total Projects",

value:stats.projects,

icon:<FaProjectDiagram/>,

color:"bg-blue-600"

},


{

title:"Total Tasks",

value:stats.tasks,

icon:<FaTasks/>,

color:"bg-purple-600"

},


{

title:"Completed",

value:stats.completed,

icon:<FaCheckCircle/>,

color:"bg-green-600"

},


{

title:"Pending",

value:stats.pending,

icon:<FaClock/>,

color:"bg-orange-600"

}



];







const pieData=[


{
name:"Completed",
value:stats.completed
},


{
name:"Pending",
value:stats.pending
}


];





const barData=[


{
month:"Jan",
tasks:20
},


{
month:"Feb",
tasks:35
},


{
month:"Mar",
tasks:45
},


{
month:"Apr",
tasks:30
}


];










if(loading){


return(

<div className="
flex
justify-center
items-center
h-96
">

<p className="text-xl">
Loading Dashboard...
</p>


</div>

)

}







return(

<div className="
space-y-8
">





<h1 className="
text-3xl
font-bold
text-gray-800
">

Dashboard

</h1>







{
error &&

<div className="
bg-red-100
text-red-700
p-4
rounded
">

{error}

</div>

}








{/* Statistics Cards */}



<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
">





{

cards.map((card,index)=>(


<div

key={index}

className="
bg-white
rounded-xl
shadow-md
p-6
flex
items-center
justify-between
"

>


<div>


<h3 className="
text-gray-500
">

{card.title}

</h3>


<p className="
text-3xl
font-bold
mt-2
">

{card.value}

</p>


</div>





<div

className={`
${card.color}
text-white
p-4
rounded-full
text-xl
`}

>

{card.icon}


</div>



</div>


))


}





</div>










{/* Charts */}


<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
">



<PieChart

data={pieData}

/>




<BarChart

data={barData}

/>



</div>









{/* Recent Tasks */}



<div className="
bg-white
rounded-xl
shadow-md
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

Recent Tasks

</h2>





<div className="
overflow-x-auto
">


<table className="
w-full
">


<thead>

<tr className="
bg-gray-100
">

<th className="p-3 text-left">
Task
</th>


<th>
Status
</th>


<th>
Priority
</th>


<th>
Date
</th>


</tr>

</thead>





<tbody>


{

stats.recentTasks.length===0 ?


<tr>

<td
colSpan="4"
className="
text-center
p-5
text-gray-500
"
>

No Tasks Found

</td>

</tr>


:


stats.recentTasks.map(task=>(


<tr

key={task._id}

className="
border-b
"

>


<td className="p-3">

{task.title}

</td>


<td>

<span className="
px-3
py-1
rounded-full
bg-blue-100
text-blue-700
">

{task.status}

</span>


</td>



<td>

{task.priority}

</td>



<td>

{task.dueDate}

</td>



</tr>


))


}



</tbody>


</table>


</div>



</div>









{/* Recent Projects */}



<div className="
bg-white
rounded-xl
shadow-md
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

Recent Projects

</h2>



<div className="
grid
md:grid-cols-3
gap-5
">



{

stats.recentProjects.length===0?


<p className="
text-gray-500
">

No Projects Found

</p>



:


stats.recentProjects.map(project=>(


<div

key={project._id}

className="
border
rounded-lg
p-4
"

>


<h3 className="
font-bold
text-lg
">

{project.name}

</h3>



<p className="
text-gray-500
mt-2
">

{project.description}

</p>



</div>


))


}




</div>


</div>






</div>

)


}



export default Dashboard;