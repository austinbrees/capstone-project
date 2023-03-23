import React from "react";
import { useGetYearlyOverviewQuery } from "state/api";
import { Box } from "@mui/material";
import BarChart from "./BarChart";

const OverviewChart = ({ view }) => {
  const { data, isLoading } = useGetYearlyOverviewQuery();

  const processedData = React.useMemo(() => {
    if (!data) return [];

    const salesByChannel = data.map((item) => {
      const salesChannelId = item._id;
      const channelIdKey = `sales_channel_${salesChannelId}`;

      return {
        country: `Sales Channel ${salesChannelId}`,
        sales_channel_1: salesChannelId === 1 ? item[view] : 0,
        sales_channel_2: salesChannelId === 2 ? item[view] : 0,
      };
    });

    return salesByChannel;
  }, [data, view]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <BarChart data={processedData} view={view} />
    </Box>
  );
};



export default OverviewChart;
