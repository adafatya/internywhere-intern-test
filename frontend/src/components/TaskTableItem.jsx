import { FaEye, FaPen, FaTrash } from "react-icons/fa6"

function TaskTableItem ({ no, name, due_date, id }) {
    function formatDate(date) {
        return date.toDateString()
    }

    return (
        <tr>
            <td>{no}</td>
            <td>{name}</td>
            <td>{formatDate(new Date(due_date))}</td>
            <td>
            <button className="button is-info">
                <span className="icon is-small">
                <FaEye />
                </span>
            </button>
            <button className="button is-warning">
                <span className="icon is-small">
                <FaPen />
                </span>
            </button>
            <button className="button is-danger">
                <span className="icon is-small">
                <FaTrash />
                </span>
            </button>
            </td>
        </tr>
    )
}

module.exports = {TaskTableItem}