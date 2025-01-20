import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store";
import "./index.css";
import Todo from "./components/Todo";
import Chatbot from "./components/Chatbot";
import Loginform from "./components/Loginform";
import Profilepage from "./components/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <BrowserRouter>
        <Loginform />
        <Todo />
        <Chatbot />
        <Profilepage />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
