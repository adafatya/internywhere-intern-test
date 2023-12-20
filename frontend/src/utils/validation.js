function isNameValid (task_name) {
    return task_name.length > 0 && task_name.length <= 50
}

function isDescriptionValid (task_description) {
    return task_description.length > 0
}

function isDueDateValid (task_due_date) {
    try {
        const due_date = new Date(task_due_date)
        return true && task_due_date.length > 0
    } catch {
        return false
    }
}

module.exports = {
    isNameValid,
    isDescriptionValid,
    isDueDateValid
}