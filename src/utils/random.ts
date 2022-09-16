import chalk from 'chalk';

export const generateRandomNumber = (min:number, max: number, numAfterDigit = 0): number =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItem = <T>(items: T[]): T => items[generateRandomNumber(0, items.length - 1)];

const getUniqueItem = <T>(usedIndexes: number[], allItems: T[]): T  => {
  const randomIndex = generateRandomNumber(0, allItems.length - 1);
  if (usedIndexes.find((item) => item === randomIndex)) {
    return getUniqueItem(usedIndexes, allItems);
  }
  usedIndexes.push(randomIndex);
  return allItems[randomIndex];
};

export const getRandomUniqueItemsByAmount = <T>(items: T[], amount: number) => {
  if (items.length === amount) {
    return items;
  }
  if (items.length < amount) {
    return console.log(chalk.bgBlack.red('Нельзя выбрать больше уникальных элементов, чем содержится в массиве!'));
  }
  const usedIndexes: number[] = [];
  const resultItems: T[] = [];

  for (let i = 0; i < amount; i++) {
    resultItems.push(getUniqueItem(usedIndexes, items));
  }

  return resultItems;
};
