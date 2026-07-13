import React from "react";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid
} from "recharts";


const BarChartComponent=({data})=>{


return (

<div className="bg-white p-5 rounded-xl shadow">


<h2 className="font-bold mb-4">
Monthly Tasks
</h2>


<BarChart
width={500}
height={300}
data={data}
>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Bar
dataKey="tasks"
/>


</BarChart>


</div>

)

}


export default BarChartComponent;