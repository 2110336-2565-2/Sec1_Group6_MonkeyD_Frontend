import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/globals.scss";
// import "../styles/utilities.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();
