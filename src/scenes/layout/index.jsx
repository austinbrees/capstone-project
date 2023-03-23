import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect } from "react";




const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const [user, setUser] = useState(null);
  //console.log("userId:", userId); // add this console.log statement
  //const { data, isLoading, error } = useGetUserQuery(userId);
  //console.log("data:", data); // add this console.log statement

  const [cookies] = useCookies(["jwt"]);

  useEffect(() => {
    const fetchUser = async () => {
      if (cookies.jwt) {
        try {
          const { data } = await axios.get("http://localhost:5001/", {
            headers: { Authorization: `Bearer ${cookies.jwt}` },
          });
          setUser(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUser();
  }, [cookies.jwt]);


  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
        user={user || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
    <Box flexGrow={1}>
    <Navbar
        user={user || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
    />
  <Outlet />
</Box>
</Box>
  );  
};

export default Layout;
