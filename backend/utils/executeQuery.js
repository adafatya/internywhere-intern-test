const db = require('./../config/database')

function executeQuery(query, payload) {
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

module.exports = executeQuery