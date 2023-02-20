import React from "react";
import { NavLink } from "react-router-dom";

const sidebarOption = [
  { name: "Home", path: "/" },
  { name: "Playground", path: "/playground" },
  { name: "BarChart", path: "/barchart" },
  { name: "LineChart", path: "/linechart" },
  { name: "Arc", path: "/arc" },
];

function Sidebar() {
  return (
    <nav className="h-full w-80 bg-emerald-300 p-6">
      <h1 className="text-2xl flex justify-center items-center font-bold mb-6 cursor-pointer">
        D3.js-example
      </h1>
      <div className="overflow-y-auto">
        {sidebarOption.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) => {
              const defaultStyle =
                "text-xl flex justify-center items-center my-2 p-2 cursor-pointer hover:bg-slate-400/[.4]";
              return isActive ? defaultStyle + " font-bold" : defaultStyle;
            }}
            key={item.name}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
export default Sidebar;
