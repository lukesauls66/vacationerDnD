import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}
// if (process.env.NODE_ENV !== "production") {
//   window.store = store;
// }
