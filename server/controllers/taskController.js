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



module.exports = {createTask}