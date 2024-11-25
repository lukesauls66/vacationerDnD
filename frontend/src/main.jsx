import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/slices/sessionSlice";
import { Modal, ModalProvider } from "./context/Modal";
import "./index.css";

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);
