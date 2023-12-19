import { handleError } from "../utils/handleError"
import { sendNotif } from "../utils/sendNotif"
import { Modal } from "./Modal"

function DeleteTask ({id, isActive, onClose, setNotif}) {
    function deleteTask () {
        const url = 'http://localhost:3001/api/task/'+id
        fetch(url, {method: 'DELETE'})
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                onClose()
                sendNotif(setNotif, 'Berhasil menghapus task', 'Task berhasil dihapus')
            }
        })
        .catch((error) => handleError(setNotif, error))
    }

    return (
        <Modal
            title={'Delete task'}
            content={<p>Apakah anda yakin ingin menghapus task?</p>}
            onConfirm={() => deleteTask()}
            onClose={onClose}
            isActive={isActive}
        />
    )
}

module.exports = {DeleteTask}