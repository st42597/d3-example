import React from "react";
import Sidebar from "./components/Sidebar";
import Viewer from "./components/Viewer";
import { BrowserRouter } from "react-router-dom";

function Main() {
  return (
    <div className="flex h-full w-full">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Sidebar />
        <Viewer />
      </BrowserRouter>
    </div>
  );
}

export default Main;
