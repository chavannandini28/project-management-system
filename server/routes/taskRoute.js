const express = require('express')
const  {
createTask,
getAllTasks,
getTaskByID,
updateStatus,
updateTask,
daleteTask
} = require('../controllers/taskController')
const {auth, admin} =require('../middleware/auth')
const {uploadFiles} = require('../uploads/taskFiles')

const router = express.Router()

router.post('/create',auth, admin, uploadFiles.single('docPath'),createTask)
router.get('/getAll',auth, getAllTasks)
router.get('/getTask/:ID',auth, getTaskByID)
router.patch('/updateStatus/:ID', auth,updateStatus)
router.put('/updateTask/:ID',auth,admin, updateTask)
router.delete('/delete/:ID',auth,admin, daleteTask)



// 1. /getCompletedTasks 
// 2. /getPendingTask 
// 3. /getInPRogressTask 

// 1. /getTasksByStatus.    ?status=""

// 2. /getTasksBySelectedMonth 



//getTotalTasks
//getTotalCompletedTask
//getTotalInprogressTask 


module.exports = router


// http://localhost:7005/task/create 
// {
//     "title":"Learn MERN",
//     "Description":"ert dfghj tyui bnm",
//     "startDate":"2026-06-10",
//     "endDate":"2026-06-30",

// }