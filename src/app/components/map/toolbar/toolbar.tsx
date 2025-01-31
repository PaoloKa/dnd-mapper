import { Box, IconButton } from "@mui/material";
import { Draw, Face, Forest, Mouse, PanTool } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";

import { AssetOptions } from "./assets/asset-options";
import { DrawOptions } from "./draw-options";
import { ToolbarButton } from "./toolbar-button";
import { useMapStore } from "../../../store";
import UserOptions from "./users/users-options";

type ContentOptions = "draw" | "users" | "assets";

export const Toolbar: FC = ({}) => {
  const [content, setContent] = useState<ContentOptions>();
  const [loading, setLoading] = useState(true);
  const activeTool = useMapStore((state) => state.activeTool);

  useEffect(() => {
    const fetchPreferences = async () => {
      const preferences = await fetch("/api/preferences");
      if (!preferences.ok) {
        console.error("Failed to fetch preferences");
        useMapStore.setState({
          preferences: {
            textures: [],
            assets: [],
          },
        });
        setLoading(false);
        return;
      }
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
        <ToolbarButton
          Icon={Draw}
          onClick={() => handleDrawClick("draw")}
          active={content === "draw"}
        />
        <ToolbarButton
          Icon={Mouse}
          onClick={() => useMapStore.setState({ activeTool: "move" })}
          active={activeTool === "move"}
        />
        <ToolbarButton
          Icon={PanTool}
          onClick={() => useMapStore.setState({ activeTool: "pan" })}
          active={activeTool === "pan"}
        />
        <ToolbarButton
          Icon={Face}
          onClick={() => handleDrawClick("users")}
          active={content === "users"}
        />

        <ToolbarButton
          Icon={Forest}
          onClick={() => handleDrawClick("assets")}
          active={content === "assets"}
        />
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
          {content === "users" && <UserOptions />}
          {content === "assets" && <AssetOptions />}
        </Box>
      )}
    </Box>
  );
};
