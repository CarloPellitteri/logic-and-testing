export interface ItemType {
  x?: number;
  y?: number;
  width: number;
  height: number;
}

export interface CoordsType {
  x: number;
  y: number;
}

export interface SpacesType {
  coords: CoordsType;
  description: number[];
}
