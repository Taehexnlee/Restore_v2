import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { useMemo } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import PageContainer from "../components/PageContainer";
import { getAppTheme } from "./theme";

function App() {
  const { darkMode } = useAppSelector((state) => state.ui);
  const paletteMode = darkMode ? "dark" : "light";
  const theme = useMemo(() => getAppTheme(paletteMode), [paletteMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "radial-gradient(circle at top, #1f2a37, #0f172a 60%)"
            : "radial-gradient(circle at top, #e3f2fd, #f3f6fb 60%)",
        }}
      >
        <Toolbar />
        <PageContainer maxWidth="lg" sx={{ minHeight: "60vh" }}>
          <Outlet />
        </PageContainer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
