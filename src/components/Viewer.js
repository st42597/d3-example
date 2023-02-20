import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlaygroundPage from "./pages/PlaygroundPage";
import BarChartPage from "./pages/BarChartPage";
import LineChartPage from "./pages/LineChartPage";
import ArcPage from "./pages/ArcPage";

function Viewer() {
  return (
    <div className="flex justify-center	items-center grow overflow-auto">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/playground" element={<PlaygroundPage />}></Route>
        <Route path="/barchart" element={<BarChartPage />}></Route>
        <Route path="/linechart" element={<LineChartPage />}></Route>
        <Route path="/arc" element={<ArcPage />}></Route>
      </Routes>
    </div>
  );
}

export default Viewer;
