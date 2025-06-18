import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'fruits',
    name: 'Fruits',
    color: 'bg-gradient-to-br from-orange-400 to-red-500',
    words: [
      'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'LEMON', 'PEACH', 'PLUM', 'BERRY',
      'MANGO', 'KIWI', 'PEAR', 'DATE', 'FIG', 'LIME', 'MELON', 'CHERRY',
      'PAPAYA', 'GUAVA', 'COCONUT', 'APRICOT', 'AVOCADO', 'PASSION',
      'PINEAPPLE', 'STRAWBERRY', 'BLUEBERRY', 'BLACKBERRY', 'RASPBERRY',
      'CRANBERRY', 'WATERMELON', 'CANTALOUPE'
    ]
  },
  {
    id: 'animals',
    name: 'Animals',
    color: 'bg-gradient-to-br from-green-400 to-blue-500',
    words: [
      'CAT', 'DOG', 'BIRD', 'FISH', 'LION', 'TIGER', 'BEAR', 'WOLF',
      'ELEPHANT', 'GIRAFFE', 'MONKEY', 'RABBIT', 'HORSE', 'COW', 'PIG',
      'SHEEP', 'GOAT', 'CHICKEN', 'DUCK', 'GOOSE', 'FROG', 'SNAKE',
      'TURTLE', 'DOLPHIN', 'WHALE', 'SHARK', 'OCTOPUS', 'SPIDER',
      'BUTTERFLY', 'EAGLE', 'PARROT', 'PENGUIN', 'KANGAROO', 'KOALA'
    ]
  },
  {
    id: 'transport',
    name: 'Transport',
    color: 'bg-gradient-to-br from-purple-400 to-pink-500',
    words: [
      'CAR', 'BUS', 'TRAIN', 'PLANE', 'BOAT', 'SHIP', 'BIKE', 'TRUCK',
      'TAXI', 'METRO', 'FERRY', 'YACHT', 'ROCKET', 'HELICOPTER', 'SCOOTER',
      'MOTORCYCLE', 'SUBMARINE', 'AIRPLANE', 'BICYCLE', 'AMBULANCE',
      'FIRETRUCK', 'POLICE', 'WAGON', 'CART', 'SLED', 'SKATE', 'CANOE'
    ]
  }
];

export const getRandomTheme = (): Theme => {
  return themes[Math.floor(Math.random() * themes.length)];
};