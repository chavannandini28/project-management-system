import React from "react";
import {
PieChart,
Pie,
Cell,
Tooltip,
Legend
} from "recharts";


const PieChartComponent=({data})=>{


return (

<div className="bg-white p-5 rounded-xl shadow">


<h2 className="font-bold mb-4">
Task Status
</h2>


<PieChart width={350} height={300}>


<Pie

data={data}

dataKey="value"

nameKey="name"

cx="50%"

cy="50%"

outerRadius={100}

label

>


{
data.map((entry,index)=>(

<Cell key={index}/>

))

}


</Pie>


<Tooltip/>

<Legend/>


</PieChart>


</div>

)

}


export default PieChartComponent;