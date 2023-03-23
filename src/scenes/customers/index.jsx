import React from 'react'
import { Box, useTheme } from '@mui/material'
import { useGetCustomersQuery } from 'state/api'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'


const Customers = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetCustomersQuery();
    console.log(data)

    const columns = [
      {
        field: '_id',
        headerName: 'ID',
        flex: 1,
      },
      {
        field: 'club_member_status',
        headerName: 'Club Member Status',
        flex: .5,
      },
      {
        field: 'age',
        headerName: 'Age',
        flex: .5,
      },
      {
        field: 'country_id',
        headerName: 'Country',
        flex: .5,
      },
      {
        field: 'postal_code',
        headerName: 'Postal Code',
        flex: .5,
      },
    ]
    
    return (
      <Box m="1.5rem 1.7rem">
        <Header title="CUSTOMERS" subtitle="List of E.U. Customers" />
        <Box mt="40px" height="75vh">
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data?.slice(0, 150) || []}
            columns={columns}
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: 'none',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme.palette.primary.light,
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: 'none',
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          />
        </Box>
      </Box>
    );
  };
  
  export default Customers;