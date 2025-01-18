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
import { useMapStore } from "../../../store";
import { Brush, Texture } from "../../../types";
import PaletteIcon from "@mui/icons-material/Palette";

// TODO resize textures
const textures = [
  // https://www.pinterest.com/pin/356628864238523403/
  {
    name: "Stone",
    src: "https://i.pinimg.com/736x/65/c3/27/65c32776dff4d7c630adec9a030c7666.jpg",
  },
  {
    name: "Grass",
    src: "https://i.pinimg.com/736x/5b/31/d8/5b31d8709b8b12767cb1f1edfd214899.jpg",
  },
  {
    name: "Dirt road",
    src: "https://i.pinimg.com/736x/47/aa/1f/47aa1fd416c8efb6904292bdd9209a02.jpg",
  },
  {
    name: "mossy cobblestone",
    src: "https://i.pinimg.com/736x/6d/7f/a9/6d7fa9b3844ebb1431a3471f2db9474f.jpg",
  },
  {
    name: "wooden floor",
    src: "https://i.pinimg.com/736x/ee/85/c5/ee85c523aafff237f32416e5fe276114.jpg",
  },
  {
    name: "ocean water",
    src: "https://i.pinimg.com/736x/f1/a7/ed/f1a7ed42b092b013089dafb1774ef2ea.jpg",
  },
];

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
          {textures.map((texture) => (
            <Box
              key={texture.name}
              onClick={() => setTexture(texture)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem",
                cursor: "pointer",
                ":hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <img
                src={texture.src}
                alt={texture.name}
                style={{ width: "50px", height: "50px" }}
              />
              <Typography>{texture.name}</Typography>
            </Box>
          ))}
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
