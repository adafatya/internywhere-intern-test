const {
    createTask,
    getTask,
    getTaskDetail,
    updateTask,
    deleteTask
} = require('./../models/task')

async function createTaskController (req, res) {
    const payload = req.body

    try {
        const result = await createTask(payload)
        res.status(201).json({data: {task_id: result.insertId}})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something's wrong on our side"})
    }
}

async function getTaskController (req, res) {
    const payload = [
        req.query.sort_column,
        parseInt(req.query.limit),
        (parseInt(req.query.page)-1)*5
    ]
    const order = req.query.sort_order

    try {
        const result = await getTask(payload, order)
        res.status(200).json({data: result})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something's wrong on our side"})
    }
}

async function getTaskDetailController (req, res) {
    const payload = req.params.taskId

    try {
        const result = await getTaskDetail(payload)
        res.status(200).json({data: result})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something's wrong on our side"})
    }
}

async function updateTaskController (req, res) {
    const payload = [
        req.body.task_name,
        req.body.task_description,
        req.body.task_due_date,
        req.params.taskId
    ]

    try {
        const result = await updateTask(payload)
        res.status(200).json({data: {affected_row: result.affectedRows}})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something's wrong on our side"})
    }
}

async function deleteTaskController (req, res) {
    const payload = req.params.taskId

    try {
        const result = await deleteTask(payload)
        res.status(200).json({data: {affected_row: result.affectedRows}})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something's wrong on our side"})
    }
}

module.exports = {
    createTaskController,
    getTaskController,
    getTaskDetailController,
    updateTaskController,
    deleteTaskController
}