import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./stores/AppStore"; // import your store
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer
        toastClassName={() =>
          "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md p-3 rounded-lg"
        }
      />
    </Provider>
  </React.StrictMode>
);
