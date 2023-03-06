import { CoordsType, ItemType, SpacesType } from "./types";

export const getFreeBoxes = (grid: number[][]) => {
  const freeBoxes: CoordsType[] = [];

  grid.forEach((row, y) => {
    row.forEach((box, x) => {
      if (!box) {
        freeBoxes.push({ x: x, y: y });
      }
    });
  });

  return freeBoxes;
};

export const getSpacesDescription = (
  grid: number[][],
  freeBoxes: CoordsType[],
  item: ItemType
) => {
  const { x, y, width, height } = item;
  const spacesDescription: SpacesType[] = [];

  freeBoxes.forEach((coords) => {
    const description: number[] = [];

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let y = coords.y + h;
        let x = coords.x + w;

        const isValueUndefined =
          x === undefined ||
          y === undefined ||
          grid[y] === undefined ||
          grid[y][x] === undefined;

        let value = 0;

        if (isValueUndefined) {
          value = 0;
        } else {
          value = grid[y][x];
        }

        description.push(value);
      }
    }

    if (coords.x < 5 - width) {
      spacesDescription.push({ coords: coords, description: description });
    }
  });
  return spacesDescription;
};

export const scanDescription = (arr: number[]) => {
  let value = true;

  arr.forEach((box) => {
    if (box) {
      value = false;
    }
  });

  return value;
};

export const getFreeCoords = (grid: number[][], item: ItemType) => {
  const { x, y, width, height } = item;

  const freeBoxes = getFreeBoxes(grid);
  const spacesDescription = getSpacesDescription(grid, freeBoxes, item);

  const foundItem = spacesDescription.find((item) =>
    scanDescription(item.description)
  );

  if (foundItem === undefined) {
    return { x: 0, y: grid.length };
  } else {
    return foundItem.coords;
  }
};

//=============================================

export const getInitialGridEmpty = (columns: number, rows: number) => {
  const newGrid: number[][] = [];

  for (let r = 0; r < rows; r++) {
    newGrid.push([]);
  }

  newGrid.forEach((row) => {
    for (let c = 0; c < columns; c++) {
      row.push(0);
    }
  });

  return newGrid;
};

export const getNewGrid = (grid: number[][], item: ItemType) => {
  const { x, y, width, height } = item;

  if (typeof x !== "number" || typeof y !== "number") {
    return;
  }

  const columns = y + 1 + height - 1;
  const rows = x + 1 + width - 1;

  const newGrid: number[][] = [];

  grid.forEach((column, index) => {
    newGrid.push([]);

    if (index < y) {
      for (let r = 0; r < rows; r++) {
        newGrid[index].push(0);
      }
    }

    if (index >= y) {
      for (let r = 0; r < rows; r++) {
        if (r < x) {
          newGrid[index].push(0);
        } else {
          newGrid[index].push(1);
        }
      }
    }
  });

  return newGrid;
};

export const generateInitialGrid = (item: ItemType) => {
  const { x, y, width, height } = item;

  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("Error, coords are undefined");
  }

  const rows = y + 1 + height - 1;
  const columns = x + 1 + width - 1;

  const initialGridEmpty = getInitialGridEmpty(columns, rows);
  const newGrid = getNewGrid(initialGridEmpty, item);

  return newGrid;
};
