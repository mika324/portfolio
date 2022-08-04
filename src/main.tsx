import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import Home from "./Home.tsx";

const App = () => {
  return (
    <>
      <Home />
    </>
  );
};
const root = document.getElementById("root");
ReactDOM.render(<App />, root);
