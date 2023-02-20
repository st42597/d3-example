import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function ArcPage() {
  const canvas = useRef(null);
  function drawChart() {
    const svg = d3
      .select(canvas.current)
      .attr("width", 800)
      .attr("height", 800);

    const g = svg.append("g").attr("transform", `translate(400, 400)`);

    const arc = d3
      .arc()
      .innerRadius(80)
      .outerRadius(100)
      .startAngle(0)
      .endAngle(Math.PI * 2);

    g.append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", "steelblue");
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

export default ArcPage;
