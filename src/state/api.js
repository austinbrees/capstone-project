import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Articles",
    "Customers",
    "Geography",
    "Transactions",
    "YearlyOverview",
  ],
  endpoints: (builder) => ({
    // getUser: builder.query({
    //   query: (id) => `general/user/${id}`,
    //   providesTags: ["User"],
    // }),
    getArticles: builder.query({
      query: (page, limit) => ({
        url: `articles/articles`,
        params: {
          page,
          limit,
          fields:
            "_id,perceived_colour_master_name,department_name,section_name",
        },
      }),
      providesTags: ["Articles"],
      transformResponse: (response) => response.data, // Add this line
    }),
    getCustomers: builder.query({
      query: () => `customers/customers`,
      providesTags: ["Customers"],
    }),
    getGeography: builder.query({
      query: () => "customers/geography",
      providesTags: ["Geography"],
    }),
    getTransactions: builder.query({
      query: ({ page, limit, sort, search }) => ({
        url: `transactions/transactions`,
        params: {
          page,
          limit,
          sort,
          search,
        },
      }),
      providesTags: ["Transactions"],
    }),
    getYearlyOverview: builder.query({
      query: () => "yearlyOverview/yearlyOverview",
      providesTags: ["YearlyOverview"],
    }),
    getDailyOverview: builder.query({
      query: () => "dailyOverview/dailyOverview",
      providesTags: ["DailyOverview"],
    }),
  }),
});



export const globalReducer = (state = { userId: null }, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};



export const {
  useGetUserQuery,
  useGetArticlesQuery,
  useGetCustomersQuery,
  useGetGeographyQuery,
  useGetTransactionsQuery,
  useGetYearlyOverviewQuery,
  useGetDailyOverviewQuery
} = api;
