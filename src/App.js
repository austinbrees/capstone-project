import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme} from "@mui/material/styles";
import { Component, useMemo } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { themeSettings} from "./theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import { Navigate, Routes } from "react-router";
import { useSelector } from "react-redux";
import Articles from "scenes/articles";
import Customers from "scenes/customers";
import Geography from "scenes/geography";
import Transactions from "scenes/transactions";
import Overview from "scenes/overview/index.jsx";
import Register from "scenes/register/Register";
import Login from "scenes/login/Login";
import Secret from "scenes/secret/Secret";



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
        <BrowserRouter>   
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes> 
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to='/dashboard' replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/yearlyoverview" element={<Overview />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}


export default App;
