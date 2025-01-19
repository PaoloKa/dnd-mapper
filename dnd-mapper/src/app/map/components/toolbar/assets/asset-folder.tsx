import { ExpandLess, ExpandMore, Folder } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import { AssetCard } from "./asset-card";

type AssetFolderProps = {
  folderData: any;
  addToFavorites: (asset: string) => void;
  parentPath?: string;
  favorites: string[];
};

export const AssetFolder: FC<AssetFolderProps> = ({
  folderData,
  addToFavorites,
  favorites,
  parentPath = "",
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
                <AssetFolder
                 favorites={favorites}
                  key={index}
                  folderData={item}
                  addToFavorites={addToFavorites}
                  parentPath={currentPath}
                />
              </Box>
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
