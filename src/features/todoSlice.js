import { createSlice } from "@reduxjs/toolkit";
import db from "./firebase";

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      db.collection("tasks")
        .add({
          title: action.payload,
          completed: false,
        })
        .then((docRef) => {
          state.tasks.push({
            title: action.payload,
            completed: false,
            id: docRef.id,
          });
        });
    },
    completeTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        db.collection("tasks").doc(task.id).update({
          completed: true,
        });
        task.completed = true;
      }
    },
    editTask: (state, action) => {
      const { index, newTitle } = action.payload;
      const task = state.tasks[index];
      if (task) {
        db.collection("tasks").doc(task.id).update({
          title: newTitle,
        });
        task.title = newTitle;
      }
    },
  },
});

export const { addTask, completeTask, editTask } = todoSlice.actions;
export default todoSlice.reducer;
