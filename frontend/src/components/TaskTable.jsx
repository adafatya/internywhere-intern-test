const { useEffect, useState } = require("react")

import 'bulma/css/bulma.min.css'
import { FaSortUp, FaSortDown } from "react-icons/fa6"

import { TaskTableItem } from "./TaskTableItem"
import { Pagination } from "./Pagination"
import { Modal } from './Modal'
import { CreateTaskForm } from './CreateTaskForm'

function TaskTable () {
    const [query, setQuery] = useState({
        sortColumn: 'task_name',
        sortOrder: 'asc',
        limit: 5,
        page: 1
    })
    const [tasks, setTasks] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [notification, setNotification] = useState({
        isOpen: false,
        title: '',
        message: ''
    })

    function changeQuery (newQuery) {
        setQuery({...query, ...newQuery})
    }

    function tableSort (column) {
        if (column === query.sortColumn) {
            if (query.sortOrder === 'asc') {
                changeQuery({sortOrder: 'desc', page: 1})
            } else {
                changeQuery({sortOrder: 'asc', page: 1})
            }
        } else {
            changeQuery({sortColumn: column, sortOrder: 'asc', page: 1})
        }
    }

    const [openFormModal, setOpenFormModal] = useState(false)
    const [task, setTask] = useState({
        task_name: '',
        task_description: '',
        task_due_date: ''
    })
    function createNewTask (task) {
        let url = 'http://localhost:3001/api/task'
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
            } else
                return response.json()
        })
        .then(() => {
            setOpenFormModal(false)
            setTask({
                task_name: '',
                task_description: '',
                task_due_date: ''
            })
            setNotification({
                isOpen: true,
                title: 'Berhasil menambahkan data',
                message: 'Data berhasil ditambahkan'
            })
        })
        .catch((error) => {
            let message = 'Silahkan coba beberapa saat lagi'
            if (error.message === 'Bad Request')
                message = 'Terdapat masalah pada input anda'
            setNotification({
                isOpen: true,
                title: error.message,
                message: message
            })
        })
    }

    useEffect(() => {
        let url = 'http://localhost:3001/api/task'
        url += `?sort_column=${query.sortColumn}`
        url += `&sort_order=${query.sortOrder}`
        url += `&limit=${query.limit}`
        url += `&page=${query.page}`
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else
                return response.json()
        })
        .then((data) => {
            setTasks(data.data)
            setTotalPage(data.total_page)
        })
        .catch((error) => {
            let message = 'Silahkan coba beberapa saat lagi'
            if (error.message === 'Bad Request')
                message = 'Terdapat masalah pada input anda'
            setNotification({
                isOpen: true,
                title: error.message,
                message: message
            })
        })

    }, [query.sortColumn, query.sortOrder, query.limit, query.page])

    return (
        <div className="ml-3">
            <button className="button is-success" onClick={() => setOpenFormModal(true)}>Create new task</button>
            <Modal
                title='Create new task'
                content={<CreateTaskForm task={task} setTask={setTask} />}
                onConfirm={() => createNewTask(task)}
                onClose={() => setOpenFormModal(false)}
                isActive={openFormModal}
            />
            <table className="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th onClick={() => tableSort('task_name')}>
                            Name {query.sortColumn === 'task_name' && (query.sortOrder === 'asc'? <FaSortUp />: <FaSortDown />)}
                        </th>
                        <th onClick={() => tableSort('task_due_date')}>
                            Due date {query.sortColumn === 'task_due_date' && (query.sortOrder === 'asc'? <FaSortUp />: <FaSortDown />)}
                        </th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task, index) => (
                            <TaskTableItem
                                key={task?.task_id}
                                no={(query.page-1)*query.limit+index+1}
                                name={task?.task_name}
                                due_date={task?.task_due_date}
                                id={task?.task_id}
                            />
                        ))
                    }
                </tbody>
            </table>
            <Pagination
                currentPage={query.page}
                totalPages={totalPage}
                onPageChange={(page) => changeQuery({page: page})}
                selectedLimit={query.limit}
                limitOptions={[5, 10, 25]}
                onLimitChange={(limit) => changeQuery({page: 1, limit: limit})}
            />
            <Modal
                title={notification.title}
                content={<p>{notification.message}</p>}
                onConfirm={() => setNotification({...notification, isOpen: false})}
                onClose={() => setNotification({...notification, isOpen: false})}
                isActive={notification.isOpen}
            />
        </div>
    )
}

module.exports = {TaskTable}