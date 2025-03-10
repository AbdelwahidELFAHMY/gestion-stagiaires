import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./stores/AppStore"; // import your store

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
