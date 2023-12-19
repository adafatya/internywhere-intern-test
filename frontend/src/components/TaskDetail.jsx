import { useEffect, useState } from "react"
import { handleError } from "../utils/handleError"
import { Modal } from "./Modal"

function TaskDetail ({id, isActive, onClose, setNotif}) {
    const [task, setTask] = useState({
        task_name: '',
        task_description: '',
        task_due_date: ''
    })

    function formatDate(date) {
        console.log(date)
        const due_date = new Date(date)
        return due_date.toDateString()
    }

    useEffect(() => {
        fetch('http://localhost:3001/api/task/'+id)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                return response.json()
            }
        })
        .then((data) => setTask(data.data[0]))
        .catch((error) => handleError(setNotif, error))
    }, [id])
    
    return (
        <Modal
            title={'Task detail'}
            content={
                <table className="table is-bordered">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{task.task_name}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{task.task_description}</td>
                        </tr>
                        <tr>
                            <td>Due date</td>
                            <td>{formatDate(task.task_due_date)}</td>
                        </tr>
                    </tbody>
                </table>
            }
            onConfirm={onClose}
            onClose={onClose}
            isActive={isActive}
        />
    )
}

module.exports = {TaskDetail}