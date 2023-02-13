import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlaygroundPage from "./pages/PlaygroundPage";
import BarChartPage from "./pages/BarChartPage";
import LineChartPage from "./pages/LineChartPage";

function Viewer() {
  return (
    <div className="flex justify-center	items-center grow overflow-scroll">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/playground" element={<PlaygroundPage />}></Route>
        <Route path="/barchart" element={<BarChartPage />}></Route>
        <Route path="/linechart" element={<LineChartPage />}></Route>
      </Routes>
    </div>
  );
}

export default Viewer;
