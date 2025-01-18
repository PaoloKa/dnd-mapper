import {
  Box,
  FormControl,
  InputLabel,
  Slider,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";
import { useMapStore } from "../../../store";
import { Texture } from "../../../types";

export const DrawOptions = () => {
  const [lineWidth, setLineWidth] = useState(5);
  const [texture, setTexture] = useState<Texture>();
  const [color, setColor] = useState("#000000");

  return (
    <Box
      sx={{
        position: "absolute",
        top: "40px",
        left: "0",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: 2,
        zIndex: 10,
        width: "400px",
      }}
    >
      <FormControl fullWidth margin="normal">
        <InputLabel>Line Width</InputLabel>
        <Slider
          value={lineWidth}
          onChange={(e, newValue) => setLineWidth(newValue as number)}
          min={1}
          max={20}
          valueLabelDisplay="auto"
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Texture</InputLabel>
        <Select
          value={texture}
          onChange={(e) => setTexture({ name: "test", src: e.target.value! })}
        >
          <MenuItem value="texture1">Texture 1</MenuItem>
          <MenuItem value="texture2">Texture 2</MenuItem>
          <MenuItem value="texture3">Texture 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Color</InputLabel>
        <ColorPicker
          value={color}
          onChange={(e) => setColor(e.toHexString())}
        />
      </FormControl>
      <Button
        onClick={() => {
          useMapStore.setState({
            drawOptions: {
              size: lineWidth,
              texture: texture ? texture : undefined,
              color,
            },
          });
        }}
        variant="contained"
      >
        Set
      </Button>
    </Box>
  );
};
