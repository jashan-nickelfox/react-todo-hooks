import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { db } from "./firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = { title: action.payload, completed: false };
      addDoc(collection(db, "tasks"), newTask)
        .then((docRef) => {
          newTask.id = docRef.id;
          action.asyncDispatch({
            type: "UPDATE_TASK_ID",
            payload: { id: docRef.id, title: newTask.title },
          });
        })
        .catch((error) => {
          console.error("Error adding task: ", error);
        });

      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }

    case "UPDATE_TASK_ID": {
      const { id, title } = action.payload;
      const updatedTasks = state.tasks.map((task) =>
        task.title === title ? { ...task, id } : task
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    }

    case "COMPLETE_TASK": {
      const taskToComplete = state.tasks[action.payload];
      if (taskToComplete && taskToComplete.id) {
        const taskRef = doc(db, "tasks", taskToComplete.id);
        updateDoc(taskRef, { completed: true }).catch((error) => {
          console.error("Error completing task: ", error);
        });

        const updatedTask = { ...taskToComplete, completed: true };
        const updatedTasks = state.tasks.map((task, index) =>
          index === action.payload ? updatedTask : task
        );
        return {
          ...state,
          tasks: updatedTasks,
        };
      }
      return state;
    }

    case "EDIT_TASK": {
      const { index, newTitle } = action.payload;
      const taskToEdit = state.tasks[index];
      if (taskToEdit && taskToEdit.id) {
        const editRef = doc(db, "tasks", taskToEdit.id);
        updateDoc(editRef, { title: newTitle }).catch((error) => {
          console.error("Error editing task: ", error);
        });

        const updatedTask = { ...taskToEdit, title: newTitle };
        const updatedTasks = state.tasks.map((task, i) =>
          i === index ? updatedTask : task
        );
        return {
          ...state,
          tasks: updatedTasks,
        };
      }
      return state;
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasksState: tasksReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { asyncDispatch: (action) => store.dispatch(action) },
      },
    }),
});

export const persistor = persistStore(store);
