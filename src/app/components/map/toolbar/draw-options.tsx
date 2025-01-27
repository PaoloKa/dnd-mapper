import "@rc-component/color-picker/assets/index.css";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Brush } from "../../../types";
import { CatalogFolder } from "./assets/catalog-folder";
import ColorPicker from "@rc-component/color-picker";
import { useMapStore } from "../../../store";

export const DrawOptions = () => {
  const [lineWidth, setLineWidth] = useState(5);
  const [texture, setTexture] = useState<string | undefined>(undefined);
  const [color, setColor] = useState("#000000");
  const activeColor = useMapStore((state) => state.drawOptions.color);
  const [brushType, setBrushType] = useState<Brush>("pencil");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const preferences = useMapStore((state) => state.preferences.textures);
  const [favorites, setFavorites] = useState(preferences);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch("/catalog-textures.json");
        const data = await response.json();
        setCatalog(data);
      } catch (error) {
        console.error("Error fetching catalog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

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
          <Box
            sx={{
              marginTop: "1rem",
              width: "100%",
              maxHeight: "440px",
              overflow: "auto",
            }}
          >
            {loading && <div>Loading textures...</div>}
            {catalog && (
              <CatalogFolder
                type="textures"
                folderData={{ folder: "textures", assets: catalog }}
                favorites={favorites}
                onItemClick={(data) => setTexture(data)}
                addToFavorites={(data) => {
                  const newFavorites = [...favorites, data];
                  setFavorites(newFavorites);
                  useMapStore.getState().saveTexturePreferences(newFavorites);
                }}
              />
            )}
            <CatalogFolder
              type="textures"
              favorites={favorites}
              onItemClick={(data) => setTexture(data)}
              folderData={{ folder: "favorites", assets: favorites }}
              addToFavorites={(data) => setFavorites((prev) => [...prev, data])}
            />
          </Box>
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
              texture: texture && brushType === 'texture' ? { src: texture, name: "remove" } : undefined,
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
