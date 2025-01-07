import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, completeTask, editTask } from "../features/todoSlice";
import "./Todo.css";

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(task.title);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editTask({ id: task.id, newTitle: editedValue }));
    setIsEditing(false);
  };

  const handleComplete = () => {
    dispatch(completeTask(task.id));
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
            <button onClick={handleComplete} className="complete-btn">
              Complete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CreateTask() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    dispatch(addTask(value));
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
  const tasks = useSelector((state) => state.tasksState.tasks);

  return (
    <div className="todo-container">
      <div className="header">ToDo - List</div>
      <div className="tasks">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <CreateTask />
    </div>
  );
}

export default Todo;
