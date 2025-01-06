import React from 'react';
import './Todo.css';
import { useSelector, useDispatch } from 'react-redux';

function Task({ task, index, completeTask }) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}
            <button onClick={() => completeTask(index)} className="complete-btn">
                Complete
            </button>
        </div>
    );
}

function CreateTask({ addTask }) {
    const [value, setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;

        addTask(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="create-task-form">
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
            <button type="submit" className="add-btn">Add Task</button>
        </form>
    );
}

function Todo() {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasksState.tasks);

    const addTask = title => {
        dispatch({ type: 'ADD_TASK', payload: title });
    };

    const completeTask = index => {
        dispatch({ type: 'COMPLETE_TASK', payload: index });
    };

    return (
        <div className="todo-container">
            <div className="header">ToDo - List</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        key={index}
                        completeTask={completeTask}
                    />
                ))}
            </div>
            <CreateTask addTask={addTask} />
        </div>
    );
}

export default Todo;
