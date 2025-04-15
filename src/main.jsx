import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./stores/AppStore"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  </React.StrictMode>
);
