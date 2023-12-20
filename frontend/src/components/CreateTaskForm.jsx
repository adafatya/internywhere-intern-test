import { useState } from "react"

import { handleError } from "../utils/handleError"
import { sendNotif } from "../utils/sendNotif"
import { isNameValid, isDescriptionValid, isDueDateValid } from "../utils/validation"

function CreateTaskForm ({isActive, onClose, setNotif}) {
    const [task, setTask] = useState({
        task_name: '',
        task_description: '',
        task_due_date: ''
    })
    function changeValue (newValue) {
        setTask({...task, ...newValue})
    }

    function createNewTask () {
        const url = 'http://localhost:3001/api/task'
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                setTask({
                    task_name: '',
                    task_description: '',
                    task_due_date: ''
                })
                sendNotif(setNotif, 'Berhasil menambahkan task', 'Task berhasil ditambah')
                onClose()
            }
        })
        .catch((error) => {
            handleError(setNotif, error)
        })
    }

    function isValid () {
        return isNameValid(task.task_name) && isDescriptionValid(task.task_description) && isDueDateValid(task.task_due_date)
    }

    return (
        <div className={`modal ${(isActive? 'is-active':'')}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title"> Create new task </p>
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
                <button className="button is-success" onClick={() => createNewTask()} disabled={!isValid()}> Add </button>
                <button className="button is-danger" onClick={onClose}> Cancel </button>
            </footer>
        </div>
    </div>
    )
}

module.exports = {CreateTaskForm}