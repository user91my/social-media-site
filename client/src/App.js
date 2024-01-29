import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // retrieve 'state.mode' ('light' or 'dark') from Redux store
  const mode = useSelector((state) => state.mode);
  // Create a MUI theme
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // Retrieves 'state.token' from Redux store. Check whether the token
  // is a truthy or a falsy.
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        {/* The 'theme' property in 'ThemeProvider' expects an object that */}
        {/* represents a Material-UI (MUI) theme. To create a MUI theme, */}
        {/* 'createTheme()' function is typically used. */}
        <ThemeProvider theme={theme}>
          {/* 'CssBaseline' is to normalize or reset CSS styles */}
          {/* across different web browsers ensuring consistent baseline */}
          {/* styling for the web app. */}
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
