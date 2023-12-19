import { useState } from "react"

import { handleError } from "../utils/handleError"
import { sendNotif } from "../utils/sendNotif"

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
                    </div>
                </div>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => createNewTask()}> Add </button>
                <button className="button is-danger" onClick={onClose}> Cancel </button>
            </footer>
        </div>
    </div>
    )
}

module.exports = {CreateTaskForm}