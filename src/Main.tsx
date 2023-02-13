import React from "react";
import Sidebar from "./components/Sidebar";

function Main() {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex justify-center	items-center grow">
        <div className="text-5xl">Chart</div>
      </div>
    </div>
  );
}

export default Main;
