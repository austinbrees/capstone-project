import React from "react";
import { Box, Typography } from "@mui/material";
import { useGetDailyOverviewQuery } from "state/api";
import Header from "components/Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DailyOverview = () => {
  const { data, isLoading } = useGetDailyOverviewQuery();

  return (
    <>
      <Header title="Daily Overview" />
      <Box p={2}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.dayOfMonth" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales_total"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="units" stroke="#82ca9d" />
          </LineChart>
        )}
      </Box>
    </>
  );
};

export default DailyOverview;
