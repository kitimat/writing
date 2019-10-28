import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";

if (process.env.NODE_ENV === "production" && navigator.serviceWorker) {
  navigator.serviceWorker.register("./service-worker.ts", {
    scope: "/assets/"
  });
}

const element = document.getElementById("root");
ReactDOM.render(<App />, element);
