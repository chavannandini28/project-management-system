import React from "react";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid
} from "recharts";


const LineChartComponent=({data})=>{


return (

<div className="bg-white p-5 rounded-xl shadow">


<h2 className="font-bold mb-4">
Performance Overview
</h2>


<LineChart

width={500}

height={300}

data={data}

>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="value"

/>


</LineChart>


</div>

)

}


export default LineChartComponent;