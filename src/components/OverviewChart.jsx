import React from "react";
import BarChart from "./BarChart";
import { useGetYearlyOverviewQuery } from "state/api";

const OverviewChart = ({ view }) => {
  const { data, isLoading } = useGetYearlyOverviewQuery();

  const processedData = React.useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      sales_channel_id: item._id,
      sales_total: item.sales_total,
      units: item.units,
    }));
  }, [data]);

  console.log("Data:", processedData); // Add this console.log statement

  if (isLoading) return <div>Loading...</div>;

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
            labelString: view === "unit" ? "Units" : "Sales",
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <BarChart data={processedData} view={view} options={options} />
    </div>
  );
};

export default OverviewChart;
