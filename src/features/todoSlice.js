import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (title, { rejectWithValue }) => {
    try {
      const newTask = { title, completed: false };
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      return { id: docRef.id, title };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (id, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { completed: true });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, newTitle }, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { title: newTitle });
      return { id, newTitle };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push({ ...action.payload, completed: false });
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(completeTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.loading = false;
        const taskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex].completed = true;
        }
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        const taskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex].title = action.payload.newTitle;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
