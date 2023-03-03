import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function ScatterPlotPage() {
  const canvas = useRef(null);
  function drawChart() {
    const data = [
      {
        x: 10,
        y: 20,
        r: 4,
      },
      {
        x: 40,
        y: 80,
        r: 10,
      },
      {
        x: 60,
        y: 50,
        r: 8,
      },
    ];
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const [width, height] = [800, 800];

    const svg = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", 800)
      .attr("height", 800);

    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([100, 0])
      .range([margin.top, height - margin.bottom]);

    const xGrid = (g) =>
      g
        .selectAll()
        .data(xScale.ticks())
        .join("line")
        .attr("x1", (d) => xScale(d))
        .attr("x2", (d) => xScale(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "gray")
        .attr("stroke-opacity", 0.2);

    const yGrid = (g) =>
      g
        .selectAll()
        .data(yScale.ticks())
        .join("line")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("y1", (d) => yScale(d))
        .attr("y2", (d) => yScale(d))
        .attr("stroke", "gray")
        .attr("stroke-opacity", 0.2);

    const gridG = svg.append("g");

    const xAxisG = svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`);
    const yAxisG = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    gridG.call(xGrid);
    gridG.call(yGrid);
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr(
        "cx",
        (d) => margin.left + ((width - margin.left - margin.right) * d.x) / 100
      )
      .attr(
        "cy",
        (d) =>
          margin.top +
          ((height - margin.top - margin.bottom) * (100 - d.y)) / 100
      )
      .attr("r", 0)
      .transition()
      .duration(1200)
      .attr("r", (d) => (700 / 100) * d.r)
      .attr("fill", "hotpink")
      .attr("opacity", 0.4);
  }

  useEffect(() => {
    drawChart();
  }, []);

  return <div ref={canvas}></div>;
}

export default ScatterPlotPage;
