import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function PieChartPage() {
  const canvas = useRef(null);
  function drawChart() {
    const data = [
      { number: 4, name: "Locke" },
      { number: 8, name: "Reyes" },
      { number: 15, name: "Ford" },
      { number: 16, name: "Jarrah" },
      { number: 23, name: "Shephard" },
      { number: 42, name: "Kwon" },
    ];
    data.sort(() => Math.random() - 0.5);
    const colors = d3.schemeSpectral[data.length];

    const svg = d3
      .select(canvas.current)
      .attr("width", 800)
      .attr("height", 800);

    const g = svg.append("g").attr("transform", `translate(400, 400)`);

    const arc = d3.arc().innerRadius(100).outerRadius(200);

    const pie = d3
      .pie()
      .value((d) => d.number)
      .sort(null);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("fill", (d, idx) => colors[idx])
      .attr("d", arc);

    g.selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 20);
  }
  useEffect(() => {
    drawChart();
  }, []);

  return (
    <>
      <svg ref={canvas}></svg>
    </>
  );
}

export default PieChartPage;
