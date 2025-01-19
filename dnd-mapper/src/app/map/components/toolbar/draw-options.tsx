import {
  Box,
  FormControl,
  InputLabel,
  Slider,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";
import { useMapStore } from "../../../../../../src/app/store";
import { Brush } from "../../../../../../src/app/types";

export const DrawOptions = () => {
  const [lineWidth, setLineWidth] = useState(5);
  const [texture, setTexture] = useState<Texture | undefined>(undefined);
  const [color, setColor] = useState("#000000");
  const activeColor = useMapStore((state) => state.drawOptions.color);
  const [brushType, setBrushType] = useState<Brush>("pencil");
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: 2,
        padding: 2,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Draw Options
      </h2>

      {/* Brush Type Selection */}
      <FormControl fullWidth margin="normal">
        <Typography>Brush Type</Typography>
        <Select
          value={brushType}
          onChange={(e) =>
            setBrushType(e.target.value as "pencil" | "spray" | "texture")
          }
        >
          <MenuItem value="pencil">Pencil</MenuItem>
          <MenuItem value="spray">Spray</MenuItem>
          <MenuItem value="texture">Texture</MenuItem>
        </Select>
      </FormControl>

      {/* Line Width */}
      <FormControl fullWidth margin="normal">
        <Typography>Line Width</Typography>
        <Slider
          value={lineWidth}
          onChange={(e, newValue) => setLineWidth(newValue as number)}
          min={1}
          max={100}
          valueLabelDisplay="auto"
        />
      </FormControl>

      {brushType === "texture" && (
        <FormControl fullWidth margin="normal">
          <Typography variant="h6">Textures</Typography>
          
        </FormControl>
      )}
      {(brushType === "pencil" || brushType === "spray") && (
        <FormControl fullWidth margin="normal">
          <Typography>Color</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              style={{
                backgroundColor: color ? color : activeColor,
                borderRadius: "50%",
                marginRight: "8px",
                height: "40px",
                width: "40px",
              }}
              onClick={() => setShowColorPicker(true)} // Open color picker dialog
            ></IconButton>
            {showColorPicker && (
              <ColorPicker
                value={color}
                onChange={(e) => setColor(e.toHexString())}
              />
            )}
          </Box>
        </FormControl>
      )}

      {/* Apply Button */}
      <Button
        onClick={() => {
          useMapStore.setState({
            drawOptions: {
              size: lineWidth,
              brushType,
              texture: texture ? texture : undefined,
              color,
            },
          });
        }}
        variant="contained"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Apply
      </Button>
    </Box>
  );
};
