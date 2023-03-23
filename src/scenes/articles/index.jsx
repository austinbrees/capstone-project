import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetArticlesQuery } from "state/api";

const Article = ({
  perceived_colour_master_name,
  prod_name,
  department_name,
  index_group_name,
  section_name,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {department_name}
        </Typography>
        <Typography variant="h5" component="div">
          {prod_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>
            Color={perceived_colour_master_name}
            </Typography>
              <Typography>
                Dept={index_group_name}
              </Typography>
            <Typography>
              index_group={section_name}
            </Typography>
        </CardContent>

      </Collapse>
    </Card>
  );
};


const Articles = () => {
  const [page, setPage] = useState(1);
  const limit = 40;
  const { data, isLoading, refetch } = useGetArticlesQuery(page, limit);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ARTICLES" subtitle="See your list of articles." />
      {data && !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data && data.map(
            ({
              _id,
              prod_name,
              section_name,
              perceived_colour_master_name,
              index_group_name,
            }) => (
              <Article
                key={_id}
                prod_name={prod_name}
                perceived_colour_value_name={perceived_colour_master_name}
                index_group_name={index_group_name}
                index_group={section_name}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Button onClick={() => setPage((page) => Math.max(page - 1, 1))}>
          Previous
        </Button>
        <Typography mx={2}>Page {page}</Typography>
        <Button onClick={() => setPage((page) => page + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
};



export default Articles;

