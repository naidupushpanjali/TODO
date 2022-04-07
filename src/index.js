import React from "react";
import "./styles/index.scss";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import * as ReactDOMClient from "react-dom/client";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(<App />);

// If you want to start measurinDg performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();