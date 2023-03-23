import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => `Sales Channel ${item.sales_channel_id}`),
    datasets: data.map((item, index) => ({
      label: `Sales Total (${item.sales_channel_id})`,
      data: [item.sales_total],
      backgroundColor: [
        `rgba(${index === 0 ? "54, 162, 235" : "255, 99, 132"}, 0.2)`,
      ],
      borderColor: [
        `rgba(${index === 0 ? "54, 162, 235" : "255, 99, 132"}, 1)`,
      ],
      borderWidth: 1,
    })),
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return `$${value / 1000000}M`;
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Sales",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Sales Channel",
          },
        },
      ],
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
