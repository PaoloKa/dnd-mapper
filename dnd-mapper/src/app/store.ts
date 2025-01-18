import { create } from "zustand";
import { DrawOptions, ToolType } from "./types";
import { Canvas } from "fabric";

interface MapStore {
  activeTool: ToolType;
  drawOptions: DrawOptions;
  canvas: Canvas | null;
}

export const useMapStore = create<MapStore>((set) => {
  return {
    activeTool: "pan",
    drawOptions: {
      brushType: "pencil",
      size: 5,
      color: "#000000",
    },
    canvas: null,
  };
});
