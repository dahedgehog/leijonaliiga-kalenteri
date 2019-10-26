import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "moment/locale/fi";
import moment from "moment";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
moment.locale("fi");

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
