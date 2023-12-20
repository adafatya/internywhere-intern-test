import { useEffect, useState } from "react"

import { handleError } from "../utils/handleError"
import { sendNotif } from "../utils/sendNotif"
import { isNameValid, isDescriptionValid, isDueDateValid } from "../utils/validation"

function EditTaskForm ({id, isActive, onClose, setNotif}) {
    const [task, setTask] = useState({
        task_name: '',
        task_description: '',
        task_due_date: ''
    })
    function changeValue (newValue) {
        setTask({...task, ...newValue})
    }

    function updateTask () {
        const url = 'http://localhost:3001/api/task/'+id
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                onClose()
                sendNotif(setNotif, 'Berhasil memperbarui task', 'Task berhasil diperbarui')
            }
        })
        .catch((error) => {
            handleError(setNotif, error)
        })
    }

    function isValid () {
        return isNameValid(task.task_name) && isDescriptionValid(task.task_description) && isDueDateValid(task.task_due_date)
    }

    useEffect(() => {
        const url = 'http://localhost:3001/api/task/'+id
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                return response.json()
            }
        })
        .then((data) => {
            let task_due_date = new Date(data.data[0].task_due_date)
            task_due_date = task_due_date.toISOString().substring(0, 10)
            setTask({...data.data[0], task_due_date: task_due_date})
        })
        .catch((error) => handleError(setNotif, error))
    }, [id])

    return (
        <div className={`modal ${(isActive? 'is-active':'')}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title"> Edit task </p>
                <button className="delete" aria-label="close" onClick={onClose}></button>
            </header>
            <section className="modal-card-body">
                <div>
                    <div className="field">
                        <label className="label">Task Name</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={task.task_name}
                                onChange={(e) => changeValue({task_name: e.target.value})} />
                        </div>
                        {!isNameValid(task.task_name) &&
                            <p className="help is-danger">Task name is invalid</p>
                        }
                    </div>
                    <div className="field">
                        <label className="label">Task Description</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={task.task_description}
                                onChange={(e) => changeValue({task_description: e.target.value})}>
                            </textarea>
                        </div>
                        {!isDescriptionValid(task.task_description) &&
                            <p className="help is-danger">Task description is invalid</p>
                        }
                    </div>
                    <div className="field">
                        <label className="label">Task Due Date</label>
                        <div className="control">
                            <input
                            type="date"
                            className="input"
                            value={task.task_due_date}
                            onChange={(e) => changeValue({task_due_date: e.target.value})} />
                        </div>
                        {!isDueDateValid(task.task_due_date) &&
                            <p className="help is-danger">Task due date is invalid</p>
                        }
                    </div>
                </div>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => updateTask()} disabled={!isValid()}> Save </button>
                <button className="button is-danger" onClick={onClose}> Cancel </button>
            </footer>
        </div>
    </div>
    )
}

module.exports = {EditTaskForm}