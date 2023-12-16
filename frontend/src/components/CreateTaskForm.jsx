function CreateTaskForm ({task, setTask}) {
    function changeValue (newValue) {
        setTask({...task, ...newValue})
    }

    return (
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
    )
}

module.exports = {CreateTaskForm}