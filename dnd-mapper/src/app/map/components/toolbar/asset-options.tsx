import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const assets = [
  "trees/34196_Spell_Component_Tree_Heart_Orange_1x1_200x200.png",
  "trees/38718_Pine_Tree_Shadow_Snow_A2_5x5_1000x1000.png",
  "trees/60454_Tree_Green_B3_5x5_1000x1000.png",
  "trees/38453_Bare_Tree_Shadow_Ashen_B10_9x10_1800x2000.png",
];

export const AssetOptions = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the catalog.json file from the public folder
    const fetchCatalog = async () => {
      try {
        const response = await fetch("/catalog.json"); // File located in the public folder
        const data = await response.json();

        // Flatten the catalog data
        const flattenAssets = (items) => {
          let flat = [];
          items.forEach((item) => {
            if (item.folder) {
              flat = flat.concat(flattenAssets(item.assets)); // Recursively handle nested folders
            } else {
              flat.push(item); // Add the asset
            }
          });
          return flat;
        };

        setAssets(flattenAssets(data)); // Set the flattened assets
      } catch (error) {
        console.error("Error fetching catalog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const handleDragStart = (event, asset) => {
    event.dataTransfer.setData("assetUrl", `/assets/${asset}`);
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
      <Typography>Asset Options</Typography>
      {/* <Typography>Search</Typography> */}
      {/* <TextField sx={{ width: "100%" }} /> */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Enable wrapping
          gap: "1rem", // Add spacing between items
          justifyContent: "center", // Center items horizontally
          alignItems: "center", // Align items vertically
          padding: "1rem",
          overflow: "auto", // Allow scrolling when content overflows
          maxHeight: "750px", // Define max height for the scrollable area
        }}
      >
        {assets.map((asset) => (
          <Box
            key={asset}
            onDragStart={(event) => handleDragStart(event, "trees/" + asset)} // Make draggable
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "80px",
              height: "100px",
              padding: "0.5rem",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "grab",
            }}
          >
            <img
              src={`/assets/trees/${asset}`}
              alt={asset}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain", // Maintain aspect ratio
              }}
            />
            <span style={{ fontSize: "12px", marginTop: "0.5rem" }}></span>
            {/* Optional: Add asset name */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
