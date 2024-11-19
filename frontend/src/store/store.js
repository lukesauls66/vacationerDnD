import { configureStore } from "@reduxjs/toolkit";
import { default as logger } from "redux-logger";

const store = configureStore({
  reducer: {
    // Your reducers here
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV === "development") {
      // const { default: logger } = require("redux-logger");
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
