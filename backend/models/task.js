const executeQuery = require('./../utils/executeQuery')

exports.createTask = (payload) => {
    const query = `INSERT INTO tasks SET ?`
    
    return executeQuery(query, payload)
}

exports.getTask = (payload) => {
    const query = `
    SELECT task_id, task_name, task_due_date
    FROM tasks
    WHERE is_deleted = false
    ORDER BY ? ?
    LIMIT ? OFFSET ?`

    return executeQuery(query, payload)
}

exports.getTaskDetail = (payload) => {
    const query = `
    SELECT task_name, task_description, task_due_date
    FROM tasks
    WHERE task_id = ?`

    return executeQuery(query, payload)
}

exports.updateTask = (payload) => {
    const query = `
    UPDATE tasks
    SET task_name = ?, task_description = ?, task_due_date = ?
    WHERE task_id = ?`

    return executeQuery(query, payload)
}

exports.deleteTask = (payload) => {
    const query = `
    UPDATE tasks
    SET is_deleted = true
    WHERE task_id = ?`

    return executeQuery(query, payload)
}