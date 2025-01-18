import { Draw } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC, useState } from "react";
import { useMapStore } from "../../../store";
import { DrawOptions } from "./draw-options";

type ToolbarProps = {};

export const Toolbar: FC<ToolbarProps> = ({}) => {
  const [showDrawOptions, setShowDrawOptions] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleDrawClick = () => {
    setShowContent(true);
    setShowDrawOptions(!showDrawOptions);
    useMapStore.setState({ activeTool: "draw" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          paddingTop: "70px",
          padding: "0 20px",
          height: "100%",
          width: "50px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <IconButton onClick={handleDrawClick}>
          <Draw sx={{ color: "#D52A2A", textShadow: "2px 2px 4px #000000" }} />
        </IconButton>
      </Box>
      {showContent && (
        <Box
          sx={{
            width: "500px",
            overflow: "hidden",
            padding: "1rem",
            border: "solid black 1px",
            boxShadow: 2,
          }}
        >
          {showDrawOptions && <DrawOptions />}
        </Box>
      )}
    </Box>
  );
};
