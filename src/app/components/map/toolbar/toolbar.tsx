import { Box, IconButton } from "@mui/material";
import { Draw, Face, Forest, Mouse } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";

import { AssetOptions } from "./assets/asset-options";
import { DrawOptions } from "./draw-options";
import { useMapStore } from "../../../store";

type ContentOptions = "draw" | "users" | "assets";

export const Toolbar: FC = ({}) => {
  const [content, setContent] = useState<ContentOptions>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      const preferences = await fetch("/api/preferences");
      const data = await preferences.json();
      if (data && Object.keys(data).length > 0) {
        useMapStore.setState({ preferences: data.preferences });
      }
      setLoading(false);
    };
    fetchPreferences();
  }, []);

  const handleDrawClick = (type: ContentOptions) => {
    if (content === type) return setContent(undefined);
    setContent(type);
    useMapStore.setState({ activeTool: "draw" });
  };

  if (loading) return <div>Loading...</div>;

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
        <IconButton onClick={() => handleDrawClick("draw")}>
          <Draw sx={{ color: "#D52A2A", textShadow: "2px 2px 4px #000000" }} />
        </IconButton>
        <IconButton
          onClick={() => useMapStore.setState({ activeTool: "move" })}
        >
          <Mouse sx={{ color: "#D52A2A", textShadow: "2px 2px 4px #000000" }} />
        </IconButton>
        <IconButton onClick={() => handleDrawClick("users")}>
          <Face sx={{ color: "#D52A2A", textShadow: "2px 2px 4px #000000" }} />
        </IconButton>
        <IconButton onClick={() => handleDrawClick("assets")}>
          <Forest
            sx={{ color: "#D52A2A", textShadow: "2px 2px 4px #000000" }}
          />
        </IconButton>
      </Box>
      {content && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "500px",
            overflow: "hidden",
            padding: "1rem",
            border: "solid black 1px",
            boxShadow: 2,
          }}
        >
          {content === "draw" && <DrawOptions />}
          {content === "users" && <h1>Users</h1>}
          {content === "assets" && <AssetOptions />}
        </Box>
      )}
    </Box>
  );
};
