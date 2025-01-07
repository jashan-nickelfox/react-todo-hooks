import React, { useState } from "react";
import "./Todo.css";
import { useSelector, useDispatch } from "react-redux";

function Task({ task, completeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, editedValue);
    setIsEditing(false);
  };

  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {isEditing ? (
        <input
          className="edit-input"
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
        />
      ) : (
        <span>{task.title}</span>
      )}
      <div className="buttons">
        {isEditing ? (
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        ) : (
          <>
            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
            <button
              onClick={() => completeTask(task.id)}
              className="complete-btn"
            >
              Complete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
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
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="add-btn">
        Add Task
      </button>
    </form>
  );
}

function Todo() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksState.tasks);

  const addTask = (title) => {
    dispatch({ type: "ADD_TASK", payload: title });
  };

  const completeTask = (id) => {
    dispatch({ type: "COMPLETE_TASK", payload: id });
  };

  const editTask = (id, newTitle) => {
    dispatch({ type: "EDIT_TASK", payload: { id, newTitle } });
  };

  return (
    <div className="todo-container">
      <div className="header">ToDo - List</div>
      <div className="tasks">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            completeTask={completeTask}
            editTask={editTask}
          />
        ))}
      </div>
      <CreateTask addTask={addTask} />
    </div>
  );
}

export default Todo;
