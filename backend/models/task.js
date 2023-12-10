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
    const payloadValues = [
        payload.sortColumn,
        payload.sortOrder,
        payload.limit,
        payload.offset
    ]

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