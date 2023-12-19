import { useState } from "react"

import { FaEye, FaPen, FaTrash } from "react-icons/fa6"

import { EditTaskForm } from "./EditTaskForm"
import { TaskDetail } from "./TaskDetail"
import { DeleteTask } from "./DeleteTask"

function TaskTableItem ({ no, name, due_date, id, setNotif }) {
    function formatDate(date) {
        return date.toDateString()
    }

    const [isEdit, setIsEdit] = useState(false)
    const [isDetail, setIsDetail] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    return (
        <tr>
            <td>{no}</td>
            <td>{name}</td>
            <td>{formatDate(new Date(due_date))}</td>
            <td>
            <button className="button is-info" onClick={() => setIsDetail(true)}>
                <span className="icon is-small">
                <FaEye />
                </span>
            </button>
            {isDetail && 
                <TaskDetail
                    id={id}
                    isActive={isDetail}
                    onClose={() => setIsDetail(false)}
                    setNotif={setNotif}
                />
            }
            <button className="button is-warning" onClick={() => setIsEdit(true)}>
                <span className="icon is-small">
                <FaPen />
                </span>
            </button>
            {isEdit &&
                <EditTaskForm
                    id={id}
                    isActive={isEdit}
                    onClose={() => setIsEdit(false)}
                    setNotif={setNotif}
                />
            }
            <button className="button is-danger" onClick={() => setIsDelete(true)}>
                <span className="icon is-small">
                <FaTrash />
                </span>
            </button>
            {isDelete &&
                <DeleteTask
                    id={id}
                    isActive={isDelete}
                    onClose={() => setIsDelete(false)}
                    setNotif={setNotif}
                />
            }
            </td>
        </tr>
    )
}

module.exports = {TaskTableItem}