"use client";

import { Box } from "@mui/material";
import MapCanvas from "./components/canvas-map";
import { Toolbar } from "./components/toolbar/toolbar";

const MapBuilder = () => {
  return (
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
          padding: "1rem",
          border: "solid black 1px",
          justifyContent: "center",
          overflow: 'hidden',
        }}
      >
        <MapCanvas />
      </Box>
    </Box>
  );
};

export default MapBuilder;
