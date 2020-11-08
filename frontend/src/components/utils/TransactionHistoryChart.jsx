import React, { createRef, useEffect, useState } from "react";
import * as d3 from "d3";
import classnames from "classnames";
import Axis from "./chartTool/Axis";
import ToolTip from "./chartTool/ToolTip";

function drawLineChart(props) {
  const { svgRef, data, xScale, yScale } = props;

  const svg = d3.select(svgRef.current).select("g");

  const line = d3
    .line()
    .x((d) => xScale(d.index))
    .y((d) => yScale(d.value))
    .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .style("stroke", "#00C1DE")
    .attr("stroke-width", "2")
    .attr("d", line);
}

const BaseChart = (drawChart) => {
  return (props) => {
    const svgRef = createRef();
    const tooltipRef = createRef();
    const { data, svgProps, scaleBandPadding } = props;

    const { margin, width, height } = svgProps;

    const yMinValue = d3.min(data, (d) => d.value);
    const yMaxValue = d3.max(data, (d) => d.value);

    const xMinValue = d3.min(data, (d) => d.index);
    const xMaxValue = d3.max(data, (d) => d.index);

    let xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);

    let yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yMinValue, yMaxValue]);

    useEffect(() => {
      flushChart();
      draw();
    });

    function flushChart() {
      d3.select(svgRef.current).selectAll("*").remove();
    }

    function draw() {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      Axis({
        ...svgProps,
        svgRef,
        xScale,
        yScale,
      });

      drawChart({
        svgRef,
        data,
        xScale,
        yScale,
      });

      ToolTip({
        svgRef,
        tooltipRef,
        data,
        xScale,
        yScale,
        ...svgProps,
      });
    }

    return (
      <div className="chart-container">
        <svg className="chart-svg" ref={svgRef} />
        <div className="chart-tooltip" ref={tooltipRef} />
        <style jsx global>{`
          .chart-tooltip {
            background: #25272a;
            border-radius: 8px;
            color: #ffffff;
            border-radius: 5px;
            width: fit-content;
            padding: 5px;
            opacity: 0;
          }
          .chart-svg {
            background: #f9f9f9;
            border-radius: 4px;
          }
          .chart-container {
            margin-left: 10px;
          }
        `}</style>
      </div>
    );
  };
};

export default BaseChart(drawLineChart);