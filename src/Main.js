import React from "react";
import Sidebar from "./components/Sidebar";
import Viewer from "./components/Viewer";
import { BrowserRouter } from "react-router-dom";
import * as pages from "./components/pages/index";
import ZoomPage from "./components/pages/ZoomPage";

const sidebarOption = [
  { name: "Home", path: "/", element: <pages.HomePage /> },
  {
    name: "Playground",
    path: "/playground",
    element: <pages.PlaygroundPage />,
  },
  { name: "BarChart", path: "/barchart", element: <pages.BarChartPage /> },
  { name: "LineChart", path: "/linechart", element: <pages.LineChartPage /> },
  { name: "Arc", path: "/arc", element: <pages.ArcPage /> },
  { name: "PieChart", path: "/piechart", element: <pages.PieChartPage /> },
  {
    name: "ScatterPlot",
    path: "/scatterplot",
    element: <pages.ScatterPlotPage />,
  },
  {
    name: "Zoom",
    path: "/zoom",
    element: <ZoomPage />,
  },
];

function Main() {
  return (
    <div className="flex h-full w-full">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Sidebar option={sidebarOption} />
        <Viewer option={sidebarOption} />
      </BrowserRouter>
    </div>
  );
}

export default Main;
