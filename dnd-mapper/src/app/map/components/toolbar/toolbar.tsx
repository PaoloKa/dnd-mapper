import { Draw } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC } from "react";
import { ToolType } from "../../../types";

type ToolbarProps = {
  activeTool: string;
  setActiveTool: (tool: ToolType) => void;
};

export const Toolbar: FC<ToolbarProps> = ({ activeTool, setActiveTool }) => {
  return (
    <Box
      sx={{
        padding: "0 20px",
        height: "100%",
        width: "50px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconButton onClick={() => setActiveTool("draw")}>
        <Draw />
      </IconButton>
    </Box>
  );
};
