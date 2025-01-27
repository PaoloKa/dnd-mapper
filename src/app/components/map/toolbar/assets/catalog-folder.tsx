import { Box, Button } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FC, useState } from "react";

import { AssetCard } from "./asset-card";
import { TextureCard } from "../texture/texture-card";

type AssetFolderProps = {
  folderData: any;
  addToFavorites: (asset: string) => void;
  parentPath?: string;
  favorites: string[];
  onItemClick?: (data: any) => void;
  type: "assets" | "textures";
};

export const CatalogFolder: FC<AssetFolderProps> = ({
  folderData,
  addToFavorites,
  favorites,
  parentPath = "",
  onItemClick,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate the current folder's path
  const currentPath = `${parentPath}${folderData.folder}/`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "1rem",
        marginBottom: "0.5rem",
      }}
    >
      {/* Folder Header */}
      <Button
        startIcon={isOpen ? <ExpandLess /> : <ExpandMore />}
        onClick={() => setIsOpen(!isOpen)}
        sx={{ justifyContent: "flex-start", textTransform: "none" }}
      >
        {folderData.folder}
      </Button>

      {/* Folder Content */}
      {isOpen && (
        <Box
          sx={{
            display: "flex",
            // flexDirection: "column",
            marginLeft: "1rem",
            flexWrap: "wrap",
          }}
        >
          {folderData.assets.map((item, index) =>
            item.folder ? (
              // Render subfolder with updated path
              <Box
                key={index}
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <CatalogFolder
                  favorites={favorites}
                  onItemClick={onItemClick}
                  key={index}
                  folderData={item}
                  addToFavorites={addToFavorites}
                  parentPath={currentPath}
                  type={type}
                />
              </Box>
            ) : type === "textures" ? (
              <TextureCard
                key={index}
                addToFavorites={addToFavorites}
                currentPath={currentPath.replace("favorites/", "")}
                item={item}
                isFavorite={favorites.includes(`${currentPath}${item}`)}
                onClick={onItemClick!}
              />
            ) : (
              // Render individual asset with the correct path
              <AssetCard
                key={index}
                addToFavorites={addToFavorites}
                currentPath={currentPath.replace("favorites/", "")}
                item={item}
                isFavorite={favorites.includes(`${currentPath}${item}`)}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
};
