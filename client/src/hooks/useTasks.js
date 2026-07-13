import {
useState,
useEffect
}
from "react";


import {

getTasksAPI,
createTaskAPI,
updateTaskAPI,
deleteTaskAPI

}

from "../api/taskAPI";





const useTasks=()=>{


const [tasks,setTasks]=useState([]);

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");






const fetchTasks=async()=>{


try{


setLoading(true);



const data =
await getTasksAPI();



setTasks(data);



}

catch(err){


setError(
"Unable to load tasks"
);


}

finally{

setLoading(false);

}


};







useEffect(()=>{


fetchTasks();


},[]);








const createTask=async(data)=>{


try{


const task =
await createTaskAPI(data);



setTasks([

...tasks,

task

]);



return task;


}

catch(err){


setError(
"Task creation failed"
);


}


};










const updateTask=async(id,data)=>{


try{


const updated =
await updateTaskAPI(
id,
data
);



setTasks(

tasks.map(task=>

task._id===id

?

updated

:

task

)

);



return updated;


}

catch(err){


setError(
"Task update failed"
);


}


};










const deleteTask=async(id)=>{


try{


await deleteTaskAPI(id);



setTasks(

tasks.filter(

task=>

task._id!==id

)

);


}

catch(err){


setError(
"Task delete failed"
);


}


};







return{


tasks,

loading,

error,

fetchTasks,

createTask,

updateTask,

deleteTask


};


};



export default useTasks;