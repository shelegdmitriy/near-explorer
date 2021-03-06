import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

import StatsApi, {
  TeragasUsedByDate,
} from "../../libraries/explorer-wamp/stats";

export default () => {
  const [teragasUsedByDate, setTeragasUsedByDate] = useState(Array());
  const [date, setDate] = useState(Array());

  useEffect(() => {
    new StatsApi().teragasUsedAggregatedByDate().then((teragasUsed) => {
      if (teragasUsed) {
        const gas = teragasUsed.map(
          (gas: TeragasUsedByDate) => gas.teragasUsed
        );
        setTeragasUsedByDate(gas);
        const date = teragasUsed.map((gas: TeragasUsedByDate) =>
          gas.date.slice(0, 10)
        );
        setDate(date);
      }
    });
  }, []);

  const getOption = () => {
    return {
      title: {
        text: "Daily Tera Gas Used",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
        backgroundColor: "#F9F9F9",
        show: true,
        color: "white",
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: date,
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Tera Gas",
          splitLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
      ],
      series: [
        {
          name: "TeraGas",
          type: "line",
          lineStyle: {
            color: "#4d84d6",
            width: 2,
          },
          symbol: "circle",
          itemStyle: {
            color: "#25272A",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(21, 99, 214)",
              },
              {
                offset: 1,
                color: "rgb(197, 221, 255)",
              },
            ]),
          },
          data: teragasUsedByDate,
        },
      ],
    };
  };

  return (
    <ReactEcharts
      option={getOption()}
      style={{
        height: "300px",
        width: "100%",
        marginTop: "26px",
        marginLeft: "24px",
      }}
    />
  );
};
