import { Character, DrawOptions, ToolType } from "./types";

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
  users: Character[];
  addUser: (user: Character) => void;
  removeUser: (id: number) => void;
  saveTexturePreferences: (textures: string[]) => void;
}

export const useMapStore = create<MapStore>((set, get) => {
  return {
    activeTool: "select",
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
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    removeUser: (id) =>
      set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
    saveTexturePreferences: (textures: string[]) => {
      const { preferences } = get();
      fetch("/api/preferences", {
        method: "POST",
        body: JSON.stringify({ textures, assets: preferences.assets }),
      });
    },
  };
});
