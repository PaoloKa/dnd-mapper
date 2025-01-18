import { create } from "zustand";
import { DrawOptions, ToolType } from "./types";

interface MapStore {
  activeTool: ToolType;
  drawOptions: DrawOptions;
}

export const useMapStore = create<MapStore>((set) => {
  return {
    activeTool: "pan",
    drawOptions: {
      size: 5,
      color: "#000000",
    },
  };
});
