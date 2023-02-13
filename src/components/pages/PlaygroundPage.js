import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function PlaygroundPage() {
  const canvas = useRef(null);
  function drawChart() {
    const sampleData = [100, 10, 30, 50, 10, 70, 200, 90];
    const sampleData2 = [110, 50, 20, 30, 50, 90, 120, 70];
    const svg = d3.select(canvas.current);
    const barWidth = 30;

    sampleData.forEach((data, index) => {
      svg
        .append("rect")
        .attr("id", `bar${index}`)
        .attr("height", data)
        .attr("width", barWidth)
        .attr("x", 40 * index + 100)
        .attr("y", 300 - data + 100)
        .transition()
        .duration(3000)
        .ease(d3.easeLinear)
        .style("fill", "red")
        .attr("height", sampleData2[index])
        .attr("y", 300 - sampleData2[index] + 100);

      svg
        .append("text")
        .attr("x", 40 * index + 100)
        .attr("y", 300 - data + 100 - 5)
        .text(data)
        .style("font-size", "0.85em")
        .style("color", "#222")
        .transition()
        .duration(3000)
        .ease(d3.easeLinear)
        .text(sampleData2[index])
        .attr("y", 300 - sampleData2[index] + 100 - 5);
    });
    d3.select("#bar0")
      .transition()
      .duration(1000)
      .style("fill", "blue")
      .delay(3000);
  }

  useEffect(() => {
    drawChart();
  });

  return (
    <div>
      <svg width="500" height="500" ref={canvas}></svg>
    </div>
  );
}

export default PlaygroundPage;
