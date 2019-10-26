import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";

navigator.serviceWorker.register("./service-worker.ts", { scope: "." });

const element = document.getElementById("root");
ReactDOM.render(<App />, element);
