import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import "./index.css";
import Todo from "./components/Todo";
import Chatbot from "./components/Chatbot";
import Loginform from "./components/Loginform";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Todo />
    </PersistGate>
    <Chatbot />
    <Loginform />
  </Provider>
);
