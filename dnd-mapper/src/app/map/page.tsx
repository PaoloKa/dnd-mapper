"use client";

import { Box } from "@mui/material";
import MapCanvas from "./components/canvas-map";
import { Toolbar } from "./components/toolbar/toolbar";
import { ToolType } from "../types";
import { useState } from "react";

const MapBuilder = () => {
  const [activeTool, setActiveTool] = useState<ToolType>("pan");

  return (
    <Box>
      <Toolbar
        setActiveTool={(val) => setActiveTool(val)}
        activeTool={activeTool}
      />
      <MapCanvas activeTool={activeTool} />
    </Box>
  );
};

export default MapBuilder;
