import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AssetFolder } from "./asset-folder";

export const AssetOptions = () => {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch("/catalog.json");
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

  const addToFavorites = (asset) => {
    setFavorites((prev) => [...prev, asset]);
  };

  if (loading) {
    return <div>Loading assets...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5">Asset Library</Typography>
      <Box
        sx={{
          marginTop: "1rem",
          width: "100%",
          maxHeight: "750px",
          overflow: "auto",
        }}
      >
        {catalog && (
          <AssetFolder
            favorites={favorites}
            folderData={{ folder: "assets", assets: catalog }}
            addToFavorites={addToFavorites}
          />
        )}
        {
          <AssetFolder
            favorites={favorites}
            folderData={{ folder: "favorites", assets: favorites }}
            addToFavorites={addToFavorites}
          />
        }
      </Box>
    </Box>
  );
};
