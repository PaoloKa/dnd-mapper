import { StarBorder } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC } from "react";

type AssetCardProps = {
  item: string;
  currentPath: string;
  addToFavorites: (asset: string) => void;
  isFavorite: boolean;
};

export const AssetCard: FC<AssetCardProps> = ({
  item,
  currentPath,
  addToFavorites,
  isFavorite,
}) => {
  const onDragStart = (event, asset) => {
    event.dataTransfer.setData("assetUrl", `/${asset}`);
  };

  return (
    <Box
      onDragStart={(event) => onDragStart(event, `${currentPath}${item}`)}
      draggable
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
        src={`/${currentPath}${item}`}
        alt={item}
        style={{
          width: "40px",
          height: "40px",
          objectFit: "contain",
        }}
      />
      <IconButton onClick={() => addToFavorites(`${currentPath}${item}`)}>
        <StarBorder
          sx={{
            fill: isFavorite ? "#D52A2A" : "black",
            textShadow: "2px 2px 4px #000000",
          }}
        />
      </IconButton>
    </Box>
  );
};
