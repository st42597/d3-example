import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function BrushPage() {
  const canvas = useRef();
  const [selectedList, setSelectedList] = useState([]);
  const [dataSize, setDataSize] = useState(5000);

  useEffect(() => {
    function drawChart() {
      const random = (s, e) => d3.randomUniform(s, e);
      const data = Array.from({ length: dataSize }, (_, i) => {
        return {
          id: i,
          x: random(0, 100)(),
          y: random(0, 100)(),
          value: random(0, 10)(),
        };
      });
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const [width, height] = [800, 800];

      const svg = d3
        .select(canvas.current)
        .attr("width", width)
        .attr("height", height);

      const gGrid = svg.selectAll("g").remove();

      const xScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([margin.left, width - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([100, 0])
        .range([margin.top, height - margin.bottom]);

      gGrid
        .selectAll()
        .data(xScale.ticks())
        .join("line")
        .attr("x1", (d) => xScale(d))
        .attr("x2", (d) => xScale(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "gray")
        .attr("stroke-opacity", 0.2);
      gGrid
        .selectAll()
        .data(yScale.ticks())
        .join("line")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("y1", (d) => yScale(d))
        .attr("y2", (d) => yScale(d))
        .attr("stroke", "gray")
        .attr("stroke-opacity", 0.2);

      const xAxisG = svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`);
      const yAxisG = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      xAxisG.call(xAxis);
      yAxisG.call(yAxis);

      const gDot = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

      const myCircle = gDot
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("transform", (d) => `translate(${xScale(d.x)}, ${yScale(d.y)})`)
        .attr("r", 2)
        .attr("fill", "gray");

      svg
        .append("g")
        .attr("class", "brush")
        .call(d3.brush().on("brush", updateChart));

      function updateChart() {
        const extent = d3.brushSelection(this);
        const tmp = [];
        myCircle.classed("fill-red-400", (d) => {
          const flag = isBrushed(extent, xScale(d.x), yScale(d.y));
          if (flag) tmp.push(d);
          return flag;
        });
        setSelectedList(tmp);
      }

      function isBrushed(brushCoords, cx, cy) {
        const x0 = brushCoords[0][0];
        const x1 = brushCoords[1][0];
        const y0 = brushCoords[0][1];
        const y1 = brushCoords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
      }
    }
    drawChart();
  }, [dataSize]);

  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <svg ref={canvas} />
        <input
          type="range"
          min={100}
          max={10000}
          step={100}
          value={dataSize}
          onChange={(d) => {
            setDataSize(d.target.value);
          }}
        ></input>
        {dataSize}
      </div>
      <div className="flex flex-col">
        <div className="h-[400px] overflow-auto">
          <div> graph</div>
          <table>
            <tr className="bg-slate-500">
              <td className="w-12">id</td>
              <td className="w-20">x</td>
              <td className="w-20">y</td>
              <td className="w-20">val</td>
            </tr>
            {selectedList.map((d) => (
              <tr key={d.id} className="bg-slate-200">
                <td>{d.id}</td>
                <td>{d.x.toFixed(3)}</td>
                <td>{d.y.toFixed(3)}</td>
                <td>{d.value.toFixed(3)}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default BrushPage;
