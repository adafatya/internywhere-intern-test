import { FaEye, FaPen, FaTrash } from "react-icons/fa6"

function TaskTableItem ({ no, name, due_date, id }) {
    function formatDate(date) {
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    return (
        <tr>
            <td>{no}</td>
            <td>{name}</td>
            <td>{formatDate(new Date(due_date))}</td>
            <td>
            <button class="button is-info">
                <span class="icon is-small">
                <FaEye />
                </span>
            </button>
            <button class="button is-warning">
                <span class="icon is-small">
                <FaPen />
                </span>
            </button>
            <button class="button is-danger">
                <span class="icon is-small">
                <FaTrash />
                </span>
            </button>
            </td>
        </tr>
    )
}

module.exports = {TaskTableItem}