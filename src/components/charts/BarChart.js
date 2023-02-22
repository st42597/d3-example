import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function BarChart() {
  const canvas = useRef(null);
  function drawChart() {
    const [width, height] = [800, 800];
    const [mt, mb, ml, mr] = [50, 50, 50, 50];
    const svg = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    const graphWidth = width - ml - mr;
    const graphHeight = height - mt - mb;

    const graph = svg
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${ml}, ${mt})`);

    const xAxisG = graph
      .append("g")
      .attr("transform", `translate(0, ${graphHeight})`);

    const yAxisG = graph.append("g");

    d3.json("data/data4.json")
      .then((data) => {
        data.shift();

        const x = d3
          .scaleBand()
          .domain(data.map((item) => item.지역이름))
          .range([0, graphWidth])
          .padding(0.25);

        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.확진자수)])
          .range([graphHeight, 0]);

        const bars = graph.selectAll("rect").data(data);

        bars
          .enter()
          .append("rect")
          .attr("width", x.bandwidth)
          .attr("height", (d) => graphHeight - y(d.확진자수))
          .attr("fill", "hotpink")
          .attr("x", (d) => x(d.지역이름))
          .attr("y", (d) => y(d.확진자수));

        const line = d3
          .line()
          .x((d) => x(d.지역이름) + 15)
          .y((d) => y(d.확진자수))
          .curve(d3.curveBasis);

        bars
          .enter()
          .append("path")
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("stroke-width", "2px")
          .attr("d", line(data));

        const xAxis = d3.axisBottom(x);
        const yAxis = d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => d + "명");

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        xAxisG
          .selectAll("text")
          .attr("fill", "blue")
          .attr("transform", "rotate(-45)")
          .attr("text-anchor", "end");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <div>
      <div ref={canvas}></div>
    </div>
  );
}

export default BarChart;
