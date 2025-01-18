export type ToolType = "draw" | "select" | "move" | "delete" | "zoom" | "pan";

export type DrawOptions = {
  size: number;
  texture?: Texture;
  color: string;
};

export type Texture = {
  name: string;
  src: string;
};
