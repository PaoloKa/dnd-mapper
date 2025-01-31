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
  role: DndRole;
  race: DndRace;
  lifepoints: number;
  avatar: string;
  armorClass: number;
  movementSpeed: number;
};

export type DndRole =
  | "Fighter"
  | "Rogue"
  | "Wizard"
  | "Cleric"
  | "Paladin"
  | "Ranger";
export type DndRace =
  | "Human"
  | "Elf"
  | "Dwarf"
  | "Orc"
  | "Tiefling"
  | "Dragonborn";

export const dndRoles: DndRole[] = [
  "Fighter",
  "Rogue",
  "Wizard",
  "Cleric",
  "Paladin",
  "Ranger",
];
export const races: DndRace[] = [
  "Human",
  "Elf",
  "Dwarf",
  "Orc",
  "Tiefling",
  "Dragonborn",
];
