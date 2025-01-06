import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        { title: "Task 1"},
        { title: "Task 2" },
        { title: "Task 3"},
    ],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({ title: action.payload, completed: false });
        },
        completeTask: (state, action) => {
            state.tasks[action.payload].completed = true;
        },
    },
});

export const { addTask, completeTask } = todoSlice.actions; 
export default todoSlice.reducer; 
