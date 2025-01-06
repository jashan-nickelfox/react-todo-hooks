import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';

const initialState = {
    tasks: [
        { title: "Task 1"},
        { title: "Task 2"},
        { title: "Task 3"}
    ]
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, { title: action.payload, completed: false }]
            };
        case 'COMPLETE_TASK':
            const updatedTasks = [...state.tasks];
            updatedTasks[action.payload].completed = true;
            return {
                ...state,
                tasks: updatedTasks
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    tasksState: tasksReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
