import { Box, TextField, Typography } from "@mui/material";

const assets = [
  "trees/34196_Spell_Component_Tree_Heart_Orange_1x1_200x200.png",
  "trees/38718_Pine_Tree_Shadow_Snow_A2_5x5_1000x1000.png",
  "trees/60454_Tree_Green_B3_5x5_1000x1000.png",
];

export const AssetOptions = () => {
  const handleDragStart = (event, asset) => {
    event.dataTransfer.setData("assetUrl", `/assets/${asset}`);
  };

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
        }}
      >
        {assets.map((asset) => (
          <Box
            key={asset}
            onDragStart={(event) => handleDragStart(event, asset)} // Make draggable
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
              src={`/assets/${asset}`}
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
