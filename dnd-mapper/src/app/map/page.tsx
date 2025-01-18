"use client";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import MapCanvas from "./components/canvas-map";
import { Toolbar } from "./components/toolbar/toolbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D52A2A", // Primary color
    },
    secondary: {
      main: "#2ecc71", // Secondary color
    },
  },
});

const MapBuilder = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          marginTop: "70px",
          height: "calc(100vh - 70px)",
          overflow: "hidden",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Toolbar />
        </Box>
        <Box
          id="map-canvas"
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            border: "solid black 1px",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <MapCanvas />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MapBuilder;
