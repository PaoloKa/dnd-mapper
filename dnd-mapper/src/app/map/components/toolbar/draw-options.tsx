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
import { use, useState } from "react";
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";
import { useMapStore } from "../../../store";
import { Texture } from "../../../types";
import PaletteIcon from "@mui/icons-material/Palette";
import { Label } from "@mui/icons-material";

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
];

export const DrawOptions = () => {
  const [lineWidth, setLineWidth] = useState(5);
  const [texture, setTexture] = useState<Texture | undefined>(undefined);
  const [color, setColor] = useState("#000000");
  const activeColor = useMapStore((state) => state.drawOptions.color);
  const [brushType, setBrushType] = useState<"pencil" | "spray" | "texture">(
    "pencil"
  );

  const textures = [
    { name: "Brick Road", src: "path/to/brick-road-texture.jpg" },
    { name: "Gravel", src: "path/to/gravel-texture.jpg" },
    // Add more textures as needed
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: 2,
        padding: 2,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          max={20}
          valueLabelDisplay="auto"
        />
      </FormControl>

      {/* Texture Selection */}
      {brushType === "texture" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Texture</InputLabel>
          <Select
            value={texture?.src || ""}
            onChange={(e) => setTexture({ name: "", src: e.target.value })}
          >
            <MenuItem value="">None</MenuItem>
            {textures.map((texture) => (
              <MenuItem key={texture.name} value={texture.src}>
                {texture.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControl fullWidth margin="normal">
        <InputLabel>Color</InputLabel>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            style={{
              backgroundColor: activeColor,
              borderRadius: "50%",
              marginRight: "8px",
            }}
            onClick={() => setColor("")} // Open color picker dialog
          >
            <PaletteIcon />
          </IconButton>
          {color && (
            <ColorPicker
              value={color}
              onChange={(e) => setColor(e.toHexString())}
            />
          )}
        </Box>
      </FormControl>

      {/* Apply Button */}
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
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Apply
      </Button>
    </Box>
  );
};
