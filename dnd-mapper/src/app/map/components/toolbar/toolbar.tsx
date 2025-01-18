import { Draw } from "@mui/icons-material";
import {
  Box,
  IconButton,

} from "@mui/material";
import { FC, useState } from "react";
import { useMapStore } from "../../../store";
import { DrawOptions } from "./draw-options";

type ToolbarProps = {};

export const Toolbar: FC<ToolbarProps> = ({}) => {
  const [showDrawOptions, setShowDrawOptions] = useState(false);

  const handleDrawClick = () => {
    setShowDrawOptions(!showDrawOptions);
    useMapStore.setState({ activeTool: "draw" });
  };

  return (
    <Box
      sx={{
        padding: "0 20px",
        height: "100%",
        width: "50px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <IconButton onClick={handleDrawClick}>
        <Draw />
      </IconButton>

      {showDrawOptions && <DrawOptions />}
    </Box>
  );
};
