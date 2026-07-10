const Task = require("../models/taskModel");
const Project = require("../models/projectModel");

async function createTask(req, res) {
    try {
        const {
            project_ID,
            title,
            description,
            startDate,
            endDate
        } = req.body;

        const project = await Project.findById(project_ID);

        if (!project) {
            return res.status(404).send({
                success: false,
                msg: "Project not found"
            });
        }

        const docPath = req.file ? req.file.filename : "";

        const newTask = await Task.create({
            project_ID,
            title,
            description,
            startDate,
            endDate,
            createdBy: req.user.id,
            docPath
        });

        res.status(201).send({
            success: true,
            msg: "Task created successfully",
            task: newTask
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}
async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find()
            .populate("project_ID", "title department status")
            .populate("createdBy", "name email role");

        res.status(200).send({
            success: true,
            tasks
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}

async function getTaskById(req, res) {
    try {
        const ID = req.params.ID;

        const task = await Task.findById(ID)
            .populate("project_ID", "title department status")
            .populate("createdBy", "name email role");

        if (!task) {
            return res.status(404).send({
                success: false,
                msg: "Task not found"
            });
        }

        // Convert mongoose document to plain object
        const taskData = task.toObject();

        // Absolute URL for downloading document
        if (taskData.docPath) {
            taskData.docPath = `http://localhost:7005/uploads/taskFiles/${taskData.docPath}`;
        }

        res.status(200).send({
            success: true,
            taskData
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}

module.exports = {createTask, getAllTasks, getTaskById}