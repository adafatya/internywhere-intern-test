const express = require("express")

const {
    createTaskController,
    getTaskController,
    getTaskDetailController,
    updateTaskController,
    deleteTaskController
} = require('./../controllers/task')

const router = express.Router()

router.post('/task', createTaskController)
router.get('/task', getTaskController)
router.get('/task/:taskId', getTaskDetailController)
router.put('/task/:taskId', updateTaskController)
router.delete('/task/:taskId', deleteTaskController)

module.exports = router