const executeQuery = require('./../utils/executeQuery')

async function createTask (payload) {
    const query = `INSERT INTO tasks SET ?`
    
    return await executeQuery(query, payload)
}

async function getTask (payload, order) {
    const query = `
    SELECT task_id, task_name, task_due_date
    FROM tasks
    WHERE is_deleted = false
    ORDER BY ?? ${order === 'desc' ? 'DESC' : 'ASC'}
    LIMIT ? OFFSET ?;
    SELECT CEIL(COUNT(task_id)/?) AS total_page
    FROM tasks`

    return await executeQuery(query, payload)
}

async function getTaskDetail (payload) {
    const query = `
    SELECT task_name, task_description, task_due_date
    FROM tasks
    WHERE task_id = ? AND is_deleted = false`

    return await executeQuery(query, payload)
}

async function updateTask (payload) {
    const query = `
    UPDATE tasks
    SET task_name = ?, task_description = ?, task_due_date = ?
    WHERE task_id = ? AND is_deleted = false`

    return await executeQuery(query, payload)
}

async function deleteTask (payload) {
    const query = `
    UPDATE tasks
    SET is_deleted = true
    WHERE task_id = ? AND is_deleted = false`

    return await executeQuery(query, payload)
}

module.exports = {
    createTask,
    getTask,
    getTaskDetail,
    updateTask,
    deleteTask
}