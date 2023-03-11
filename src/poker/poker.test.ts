import { Card } from "./types";
import {
  checkRoyalFlush,
  sortCardsByValue,
  checkGap,
  buildStraight,
  checkFlush,
} from "./utilities";

describe("checkGap", () => {
  describe("WHEN gets called with cards", () => {
    describe("AND ther's a gap", () => {
      it("Should return true", () => {
        const cards: Card[] = [
          { figure: "2", suite: "spades", value: 2 },
          { figure: "5", suite: "club", value: 5 },
        ];

        const received = checkGap(cards);
        const expected = true;

        expect(received).toBe(expected);
      });
    });
    describe("AND ther's NO gap", () => {
      it("Should return false", () => {
        const cards: Card[] = [
          { figure: "4", suite: "spades", value: 4 },
          { figure: "5", suite: "club", value: 5 },
        ];

        const received = checkGap(cards);
        const expected = false;

        expect(received).toBe(expected);
      });
    });
    describe("AND cards array is empty", () => {
      it("Should return false", () => {
        const cards: Card[] = [];

        const received = checkGap(cards);
        const expected = false;

        expect(received).toBe(expected);
      });
    });
    describe("AND cards array has 1 card", () => {
      it("Should return false", () => {
        const cards: Card[] = [{ figure: "5", suite: "club", value: 5 }];

        const received = checkGap(cards);
        const expected = false;

        expect(received).toBe(expected);
      });
    });
  });
});

describe("sortCardsByValue", () => {
  describe("WHEN gets called with 7 UNORDERED cards", () => {
    it("Should return an Array with ORDERED cards", () => {
      const cards: Card[] = [
        {
          figure: "2",
          suite: "spades",
          value: 2,
        },
        {
          figure: "K",
          suite: "hearts",
          value: 13,
        },
        {
          figure: "J",
          suite: "hearts",
          value: 11,
        },
        {
          figure: "5",
          suite: "club",
          value: 5,
        },
        {
          figure: "10",
          suite: "hearts",
          value: 10,
        },
        {
          figure: "Q",
          suite: "hearts",
          value: 12,
        },
        {
          figure: "A",
          suite: "hearts",
          value: 14,
        },
      ];

      const received = sortCardsByValue(cards);
      const expected = [
        { figure: "2", suite: "spades", value: 2 },
        { figure: "5", suite: "club", value: 5 },
        { figure: "10", suite: "hearts", value: 10 },
        { figure: "J", suite: "hearts", value: 11 },
        { figure: "Q", suite: "hearts", value: 12 },
        { figure: "K", suite: "hearts", value: 13 },
        { figure: "A", suite: "hearts", value: 14 },
      ];

      expect(received).toEqual(expected);
    });
  });
});

describe("buildStraight", () => {
  describe("WHEN gets called with 7 ORDERED cards", () => {
    describe("AND ther's NO straight", () => {
      it("Should return empty array", () => {
        const cards: Card[] = [
          { figure: "2", suite: "spades", value: 2 },
          { figure: "5", suite: "club", value: 5 },
          { figure: "9", suite: "hearts", value: 9 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "hearts", value: 12 },
          { figure: "K", suite: "hearts", value: 13 },
          { figure: "A", suite: "hearts", value: 14 },
        ];

        const received = buildStraight(cards);
        const expected = [];

        expect(received).toEqual(expected);
      });
    });
    describe("AND ther's a straight", () => {
      it("Should return a 5 cards straight array ", () => {
        const cards: Card[] = [
          { figure: "2", suite: "spades", value: 2 },
          { figure: "5", suite: "club", value: 5 },
          { figure: "10", suite: "hearts", value: 10 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "hearts", value: 12 },
          { figure: "K", suite: "hearts", value: 13 },
          { figure: "A", suite: "hearts", value: 14 },
        ];

        const received = buildStraight(cards);
        const expected = [
          { figure: "10", suite: "hearts", value: 10 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "hearts", value: 12 },
          { figure: "K", suite: "hearts", value: 13 },
          { figure: "A", suite: "hearts", value: 14 },
        ];

        expect(received).toEqual(expected);
      });
    });
    describe("AND ther's a straight", () => {
      it("Should return a 5 cards straight array ", () => {
        const cards: Card[] = [
          { figure: "8", suite: "spades", value: 8 },
          { figure: "9", suite: "club", value: 9 },
          { figure: "10", suite: "hearts", value: 10 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "hearts", value: 12 },
          { figure: "K", suite: "hearts", value: 13 },
          { figure: "A", suite: "hearts", value: 14 },
        ];

        const received = buildStraight(cards);
        const expected = [
          { figure: "10", suite: "hearts", value: 10 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "hearts", value: 12 },
          { figure: "K", suite: "hearts", value: 13 },
          { figure: "A", suite: "hearts", value: 14 },
        ];

        expect(received).toEqual(expected);
      });
    });
  });
});

describe("checkFlush", () => {
  describe("WHEN gets called with  cards", () => {
    describe("AND ther's NO flush", () => {
      it("Should return empty string", () => {
        const cards: Card[] = [
          { figure: "2", suite: "spades", value: 2 },
          { figure: "5", suite: "club", value: 5 },
          { figure: "9", suite: "hearts", value: 9 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "diamond", value: 12 },
          { figure: "K", suite: "club", value: 13 },
          { figure: "A", suite: "hearts", value: 14 },
        ];

        const received = checkFlush(cards);
        const expected = "";

        expect(received).toEqual(expected);
      });
    });
    describe("AND ther's flush", () => {
      it("Should return a suite string", () => {
        const cards: Card[] = [
          { figure: "2", suite: "spades", value: 2 },
          { figure: "5", suite: "diamond", value: 5 },
          { figure: "9", suite: "diamond", value: 9 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "diamond", value: 12 },
          { figure: "K", suite: "diamond", value: 13 },
          { figure: "A", suite: "diamond", value: 14 },
        ];

        const received = checkFlush(cards);
        const expected = "diamond";

        expect(received).toEqual(expected);
      });
    });
    describe("AND ther's flush", () => {
      it("Should return a suite string", () => {
        const cards: Card[] = [
          { figure: "2", suite: "spades", value: 2 },
          { figure: "5", suite: "diamond", value: 5 },
          { figure: "9", suite: "diamond", value: 9 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "diamond", value: 12 },
          { figure: "K", suite: "diamond", value: 13 },
          { figure: "A", suite: "diamond", value: 14 },
        ];

        const received = checkFlush(cards);
        const expected = "diamond";

        expect(received).toEqual(expected);
      });
    });
  });
});

describe("checkRoyalFlush", () => {
  describe("WHEN gets called with 7 cards", () => {
    describe("AND ther's NO a royal flush", () => {
      it("Should return 'no royal flush'", () => {
        const cards: Card[] = [
          { figure: "2", suite: "spades", value: 2 },
          { figure: "5", suite: "club", value: 5 },
          { figure: "9", suite: "hearts", value: 9 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "Q", suite: "diamond", value: 12 },
          { figure: "K", suite: "club", value: 13 },
          { figure: "A", suite: "hearts", value: 14 },
        ];

        const received = checkRoyalFlush(cards);
        const expected = "no royal flush";

        expect(received).toBe(expected);
      });
    });
    describe("AND ther's a royal flush", () => {
      it("Should return 'hearts royal flush'", () => {
        const cards: Card[] = [
          { figure: "10", suite: "hearts", value: 10 },
          { figure: "A", suite: "hearts", value: 14 },
          { figure: "2", suite: "spades", value: 2 },
          { figure: "J", suite: "hearts", value: 11 },
          { figure: "5", suite: "club", value: 5 },
          { figure: "K", suite: "hearts", value: 13 },
          { figure: "Q", suite: "hearts", value: 12 },
        ];

        const received = checkRoyalFlush(cards);
        const expected = "hearts royal flush";

        expect(received).toBe(expected);
      });
    });
  });
});
