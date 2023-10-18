import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { App } from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
		<ToastContainer position='bottom-left' autoClose={2000} />
	</Provider>
);
