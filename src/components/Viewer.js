import React from "react";
import { Routes, Route } from "react-router-dom";

function Viewer(props) {
  return (
    <div className="flex justify-center	items-center grow overflow-auto">
      <Routes>
        {props.option.map((item) => (
          <Route
            path={item.path}
            element={item.element}
            key={item.name}
          ></Route>
        ))}
      </Routes>
    </div>
  );
}

export default Viewer;
