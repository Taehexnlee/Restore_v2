import { useState } from "react";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] =useState(false);
  const palleteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })

  const toggleDarkMode =() => {
    setDarkMode(!darkMode);
  }
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar toggleDarkMode = {toggleDarkMode} darkMode = {darkMode}/>
      <Box
        sx={{
          minHeight:'100vh',
          background: darkMode 
            ? 'radical-gradient(circle, #1e3aBa, #111B27)'
            : 'radical-gradient(circle, #baecf9, #f0f9ff)',

          py: 6
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8}}>
          <Outlet/>
        </Container>
      </Box>

    </ThemeProvider>

  );
}

export default App;