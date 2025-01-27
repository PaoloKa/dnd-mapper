"use client";

import { Box, ThemeProvider, createTheme } from "@mui/material";

import MapCanvas from "../components/map/canvas-map";
import { Toolbar } from "../components/map/toolbar/toolbar";

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
