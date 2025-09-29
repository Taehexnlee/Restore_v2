import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

const primary = {
  light: "#4dabf5",
  main: "#1976d2",
  dark: "#115293",
};

const secondary = {
  light: "#ffb74d",
  main: "#ff9800",
  dark: "#c66900",
};

export const getAppTheme = (mode: PaletteMode) => {
  const theme = createTheme({
    palette: {
      mode,
      primary,
      secondary,
      background: {
        default: mode === "light" ? "#f2f5f9" : "#0e141b",
        paper: mode === "light" ? "#ffffff" : "#15202b",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Roboto", "Segoe UI", sans-serif',
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
        letterSpacing: 0.2,
      },
      subtitle2: {
        letterSpacing: 0.4,
      },
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
          color: "transparent",
        },
        styleOverrides: {
          root: {
            backdropFilter: "blur(16px)",
            backgroundColor: mode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(21, 32, 43, 0.85)",
            borderBottom: `1px solid ${mode === "light" ? "#d7e3f3" : "#1f2a36"}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
