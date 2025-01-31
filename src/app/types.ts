export type ToolType = "draw" | "select" | "move" | "delete" | "zoom" | "pan";

export type DrawOptions = {
  size: number;
  texture?: Texture;
  brushType: "spray" | "pencil" | "texture";
  color: string;
};

export type Brush = "spray" | "pencil" | "texture";

export type Texture = {
  name: string;
  src: string;
};


export type Character = {
  id: number;
  name: string;
  role: string;
}
