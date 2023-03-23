import React from "react";
import { useGetDailyOverviewQuery } from "../api";
import { Line } from "react-chartjs-2";

const DailyOverviewChart = () => {
  const { data = [], isFetching } = useGetDailyOverviewQuery();

  const chartData = {
    labels: data.map((d) => `${d._id.dayOfMonth}-${d._id.month}-${d._id.year}`),
    datasets: [
      {
        label: "Sales Total",
        data: data.map((d) => d.sales_total),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "Units",
        data: data.map((d) => d.units),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.4)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>Daily Overview</h2>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default DailyOverviewChart;
