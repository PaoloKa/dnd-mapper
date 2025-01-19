import { StarBorder } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC } from "react";

type TextureCardProps = {
  item: string;
  currentPath: string;
  addToFavorites: (asset: string) => void;
  isFavorite: boolean;
  onClick: (data: any) => void;
};

export const TextureCard: FC<TextureCardProps> = ({
  item,
  currentPath,
  addToFavorites,
  isFavorite,
  onClick
}) => {
  return (

    <Box
      onClick={() => onClick(`${currentPath}${item}`)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        cursor: "pointer",
        borderRadius: "8px",
        ":hover": { backgroundColor: "#f0f0f0" },
       
      }}
    >
      <img
        src={`/${currentPath}${item}`}
        alt={item}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
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
