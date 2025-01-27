import { DrawOptions, ToolType } from "./types";

import { Canvas } from "fabric";
import { create } from "zustand";

interface MapStore {
  activeTool: ToolType;
  drawOptions: DrawOptions;
  canvas: Canvas | null;
  preferences: {
    textures: string[];
    assets: string[];
  };
  saveTexturePreferences: (textures: string[]) => void;
}

export const useMapStore = create<MapStore>((set, get) => {
  return {
    activeTool: "pan",
    drawOptions: {
      brushType: "pencil",
      size: 5,
      color: "#000000",
    },
    canvas: null,
    preferences: {
      textures: [],
      assets: [],
    },
    saveTexturePreferences: (textures: string[]) => {
      const { preferences } = get();
      fetch("/api/preferences", {
        method: "POST",
        body: JSON.stringify({ textures, assets: preferences.assets }),
      });
    },
  };
});
