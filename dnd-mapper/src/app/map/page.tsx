"use client";

import { Box } from "@mui/material";
import MapCanvas from "./components/canvas-map";
import { Toolbar } from "./components/toolbar/toolbar";

const MapBuilder = () => {
  return (
    <Box>
      <Toolbar />
      <MapCanvas />
    </Box>
  );
};

export default MapBuilder;
