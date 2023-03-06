import {
  generateInitialGrid,
  getFreeBoxes,
  getFreeCoords,
  getInitialGridEmpty,
  getNewGrid,
  getSpacesDescription,
  scanDescription,
} from "./utilities";

describe("getFreeBoxes", () => {
  describe("When gets called with grid ", () => {
    it("should return free boxes coords", () => {
      const grid = [
        [1, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ];

      const received = getFreeBoxes(grid);
      const expected = [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ];

      expect(received).toEqual(expected);
    });
  });
});

describe("getSpacesDescription", () => {
  describe("When gets called with grid, coords and item size", () => {
    it("should return an array with spaces description", () => {
      const grid = [
        [1, 0, 0],
        [0, 1, 1],
        [0, 1, 0],
      ];

      const coords = [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ];

      const item = {
        width: 2,
        height: 2,
      };

      const received = getSpacesDescription(grid, coords, item);
      const expected = [
        { coords: { x: 1, y: 0 }, description: [0, 0, 1, 1] },
        { coords: { x: 2, y: 0 }, description: [0, 0, 1, 0] },
        { coords: { x: 0, y: 1 }, description: [0, 1, 0, 1] },
        { coords: { x: 0, y: 2 }, description: [0, 1, 0, 0] },
      ];

      expect(received).toEqual(expected);
    });
  });
});

describe("scanDescription", () => {
  describe("When gets called with empty array", () => {
    it("should return true", () => {
      const arr = [0, 0, 0, 0];

      const received = scanDescription(arr);
      const expected = true;

      expect(received).toEqual(expected);
    });
  });
  describe("When gets called with noempty array", () => {
    it("should return false", () => {
      const arr = [0, 0, 1, 0];

      const received = scanDescription(arr);
      const expected = false;

      expect(received).toEqual(expected);
    });
  });
});

describe("getFreeCoords", () => {
  describe("When gets called with grid and item", () => {
    it("should return free coords", () => {
      const grid = [
        [1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      const item = {
        x: undefined,
        y: undefined,
        width: 2,
        height: 3,
      };

      const received = getFreeCoords(grid, item);
      const expected = { x: 1, y: 0 };

      expect(received).toEqual(expected);
    });
  });
});

//=============================================

describe("getInitialGridEmpty", () => {
  describe("WHEN gets called with columns and rows", () => {
    it("should return the correct grid", () => {
      const columns = 3;
      const rows = 4;
      const received = getInitialGridEmpty(columns, rows);
      const expected = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      expect(received).toEqual(expected);
    });
  });
});

describe("getNewGrid", () => {
  describe("When gets called with initial grid and an item", () => {
    it("should return an array describing item position in grid", () => {
      const grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      const item = {
        x: 2,
        y: 1,
        width: 1,
        height: 3,
      };

      const received = getNewGrid(grid, item);
      const expected = [
        [0, 0, 0],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ];

      expect(received).toEqual(expected);
    });
  });
});

describe("generateInitialGrid", () => {
  describe("WHEN gets called with an undefined coords item", () => {
    it("should return an Error", () => {
      expect.assertions(1);

      const item = {
        x: undefined,
        y: undefined,
        width: 1,
        height: 1,
      };

      try {
        generateInitialGrid(item);
      } catch (error) {
        expect(error.message).toBe("Error, coords are undefined");
      }
    });
  });
  // describe("WHEN gets called with an item", () => {
  //   it("should return an array describeing correct grid", () => {
  //     const item = {
  //       x: 2,
  //       y: 1,
  //       width: 2,
  //       height: 2,
  //     };

  //     const received = generateInitialGrid(item);
  //     const expected = [
  //       [false, false, false, false],
  //       [false, false, false, false],
  //       [false, false, false, false],
  //     ];

  //     expect(received).toEqual(expected);
  //   });
  // });
});
