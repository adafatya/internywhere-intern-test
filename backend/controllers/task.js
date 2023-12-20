const {
    createTask,
    getTask,
    getTaskDetail,
    updateTask,
    deleteTask
} = require('./../models/task')

async function createTaskController (req, res) {
    if (!req.body.task_name || !req.body.task_description || !req.body.task_due_date) {
        res.status(400).json({error: 'Some parameter is missing'})
    } else {
        const payload = req.body
        try {
            const result = await createTask(payload)
            res.status(201).json({data: {task_id: result.insertId}})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Something's wrong on our side"})
        }
    }
}

async function getTaskController (req, res) {
    const limit = parseInt(req.query.limit)
    const offset = (parseInt(req.query.page)-1)*limit
    
    if (Number.isNaN(limit) || Number.isNaN(offset)) {
        res.status(400).json({error: 'Limit or page is not integer'})
    } else if (!req.query.limit || !req.query.page || !req.query.order || !req.query.sort_column) {
        res.status(400).json({error: 'Some parameter is missing'})
    } else {
        const payload = [
            req.query.sort_column,
            limit,
            offset,
            limit
        ]
        const order = req.query.sort_order
    
        try {
            const result = await getTask(payload, order)
            res.status(200).json({data: result[0], total_page: result[1][0].total_page})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Something's wrong on our side"})
        }
    }
}

async function getTaskDetailController (req, res) {
    const payload = parseInt(req.params.taskId)

    if (Number.isNaN(payload)) {
        res.status(400).json({error: 'task id must be integer'})
    } else {
        try {
            const result = await getTaskDetail(payload)
            res.status(200).json({data: result})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Something's wrong on our side"})
        }
    }
}

async function updateTaskController (req, res) {
    if (!req.body.task_name || !req.body.task_description || !req.body.task_due_date || !req.params.taskId) {
        res.status(400).json({error: 'Some parameter is missing'})
    } else if (Number.isNaN(parseInt(req.params.taskId))) {
        res.status(400).json({error: 'task id must be integer'})
    } else {
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
}

async function deleteTaskController (req, res) {
    const payload = parseInt(req.params.taskId)

    if (Number.isNaN(payload)) {
        res.status(400).json({error: 'task id must be integer'})
    } else {
        try {
            const result = await getTaskDetail(payload)
            res.status(200).json({data: result})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Something's wrong on our side"})
        }
    }
}

module.exports = {
    createTaskController,
    getTaskController,
    getTaskDetailController,
    updateTaskController,
    deleteTaskController
}