const db = require('./../config/database')

exports.createTask = (payload) => {
    const query = `INSERT INTO tasks SET ?`
    
    return new Promise((resolve, reject) => {
        db.query(query, payload, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results.insertedId)
            }
        })
    })
}

exports.getTask = (payload) => {
    const query = `
    SELECT task_id, task_name, task_due_date
    FROM tasks
    WHERE is_deleted = false
    ORDER BY ? ?
    LIMIT ? OFFSET ?`

    return new Promise((resolve, reject) => {
        db.query(query, payload, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

exports.getTaskDetail = (payload) => {
    const query = `
    SELECT task_name, task_description, task_due_date
    FROM tasks
    WHERE task_id = ?`

    return new Promise((resolve, reject) => {
        db.query(query, payload, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

exports.updateTask = (payload) => {
    const query = `
    UPDATE tasks
    SET task_name = ?, task_description = ?, task_due_date = ?
    WHERE task_id = ?`

    return new Promise((resolve, reject) => {
        db.query(query, payload, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results.changedRows)
            }
        })
    })
}

exports.deleteTask = (payload) => {
    const query = `
    UPDATE tasks
    SET is_deleted = true
    WHERE task_id = ?`

    return new Promise((resolve, reject) => {
        db.query(query, payload, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results.changedRows)
            }
        })
    })
}