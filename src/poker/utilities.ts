import { Card, CardSuitCounterMap } from "./types";

export const sortCardsByValue = (cards: Card[]) => {
  return [...cards].sort((card1, card2) => card1.value - card2.value);
};

export const checkGap = (cards: Card[]) => {
  let isGapFound = cards.some((card, i, cards) => {
    const nextCard = cards[i + 1]?.value;

    if (!nextCard) {
      return false;
    }
    return nextCard - card.value !== 1;
  });

  return isGapFound;
};

export const buildStraight = (cards: Card[]) => {
  let arr = cards.reduce((acc: Card[], card, i, cards) => {
    if (i === 0) {
      return [card];
    }

    const isGap = checkGap([acc[acc.length - 1], card]);

    if (isGap) {
      return [card];
    }

    acc.push(card);

    return acc;
  }, []);

  if (arr.length < 5) {
    return [];
  }

  return arr.slice(arr.length - 5, arr.length);
};

export const checkStraight = (cards: Card[]) => {
  const orderedCards = sortCardsByValue(cards);
  const straightCards = buildStraight(orderedCards);

  return straightCards.length === 5;
};

export const checkFlush = (cards: Card[]) => {
  const state = cards.reduce((acc: CardSuitCounterMap, card, i) => {
    acc[card.suite] = acc[card.suite] ? acc[card.suite] + 1 : 1;
    return acc;
  }, {});

  const entries = Object.entries(state);
  const itemFound = entries.find((item) => item[1] >= 5);

  return itemFound?.[0] || "";
};

export const checkRoyalFlush = (cards: Card[]) => {
  const sortedCards = sortCardsByValue(cards);
  const buildedStraigth = buildStraight(sortedCards);
  const isStraigth = checkStraight(cards);
  const isFlush = checkFlush(buildedStraigth);

  if (!isStraigth || !isFlush) {
    return `no royal flush`;
  }

  return `${isFlush} royal flush`;
};
