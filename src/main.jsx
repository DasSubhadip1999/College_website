import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import { ResponsiveProvider } from "./context/ResponsiveContext";
import RouterComponet from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ResponsiveProvider>
      <RouterComponet />
      <ToastContainer />
    </ResponsiveProvider>
  </Provider>
);
