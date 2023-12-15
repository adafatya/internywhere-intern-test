import { TaskTable } from "./components/TaskTable"

function App () {
    return (
        <div>
            <h1 className="title">Simple Tasks CRUD</h1>
            <TaskTable />
        </div>
    )
}

module.exports = {App}