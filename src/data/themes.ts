import { Theme } from '../types';

export const themes: Theme[] = [
  // Beginner Themes (3 themes)
  {
    id: 'fruits',
    name: 'Fruits',
    difficulty: 'beginner',
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
    difficulty: 'beginner',
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
    id: 'colors',
    name: 'Colors',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-pink-400 to-purple-500',
    words: [
      'RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK', 'BROWN',
      'BLACK', 'WHITE', 'GRAY', 'GOLD', 'SILVER', 'NAVY', 'TEAL', 'MAROON',
      'LIME', 'CYAN', 'MAGENTA', 'INDIGO', 'VIOLET', 'CRIMSON', 'TURQUOISE',
      'AMBER', 'EMERALD', 'SAPPHIRE', 'RUBY', 'PEARL', 'COPPER', 'BRONZE'
    ]
  },
  // Intermediate Themes (3 themes)
  {
    id: 'transport',
    name: 'Transport',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-purple-400 to-pink-500',
    words: [
      'CAR', 'BUS', 'TRAIN', 'PLANE', 'BOAT', 'SHIP', 'BIKE', 'TRUCK',
      'TAXI', 'METRO', 'FERRY', 'YACHT', 'ROCKET', 'HELICOPTER', 'SCOOTER',
      'MOTORCYCLE', 'SUBMARINE', 'AIRPLANE', 'BICYCLE', 'AMBULANCE',
      'FIRETRUCK', 'POLICE', 'WAGON', 'CART', 'SLED', 'SKATE', 'CANOE',
      'JET', 'CRUISE', 'TRAM', 'CABLE', 'GONDOLA', 'HOVERCRAFT'
    ]
  },
  {
    id: 'food',
    name: 'Food',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    words: [
      'PIZZA', 'BURGER', 'SALAD', 'SANDWICH', 'PASTA', 'STEAK', 'CHICKEN',
      'FISH', 'RICE', 'BREAD', 'CAKE', 'COOKIE', 'ICE', 'CREAM', 'CHOCOLATE',
      'CANDY', 'CHIPS', 'NUTS', 'CHEESE', 'MILK', 'JUICE', 'COFFEE', 'TEA',
      'WATER', 'SODA', 'WINE', 'BEER', 'SOUP', 'STEW', 'CURRY', 'SUSHI',
      'TACO', 'BURRITO', 'LASAGNA', 'SPAGHETTI', 'MEATBALL', 'HOTDOG'
    ]
  },
  {
    id: 'jobs',
    name: 'Jobs',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    words: [
      'DOCTOR', 'TEACHER', 'ENGINEER', 'LAWYER', 'NURSE', 'POLICE', 'FIREFIGHTER',
      'CHEF', 'DRIVER', 'PILOT', 'FARMER', 'BUILDER', 'ARTIST', 'MUSICIAN',
      'WRITER', 'ACTOR', 'DANCER', 'SCIENTIST', 'RESEARCHER', 'MANAGER',
      'SECRETARY', 'RECEPTIONIST', 'ACCOUNTANT', 'BANKER', 'SALES', 'MARKETING',
      'DESIGNER', 'PROGRAMMER', 'ANALYST', 'CONSULTANT', 'ADVISOR', 'COUNSELOR'
    ]
  },
  // Advanced Themes (3 themes)
  {
    id: 'technology',
    name: 'Technology',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-indigo-400 to-purple-500',
    words: [
      'COMPUTER', 'SMARTPHONE', 'TABLET', 'LAPTOP', 'KEYBOARD', 'MOUSE', 'MONITOR',
      'PRINTER', 'SCANNER', 'CAMERA', 'SPEAKER', 'HEADPHONE', 'MICROPHONE',
      'BATTERY', 'CHARGER', 'CABLE', 'WIFI', 'BLUETOOTH', 'USB', 'HDMI',
      'PROCESSOR', 'MEMORY', 'STORAGE', 'SOFTWARE', 'HARDWARE', 'NETWORK',
      'INTERNET', 'WEBSITE', 'EMAIL', 'PASSWORD', 'SECURITY', 'VIRUS',
      'BACKUP', 'CLOUD', 'DATABASE', 'SERVER', 'ROUTER', 'MODEM'
    ]
  },
  {
    id: 'science',
    name: 'Science',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-green-400 to-teal-500',
    words: [
      'CHEMISTRY', 'PHYSICS', 'BIOLOGY', 'ASTRONOMY', 'GEOLOGY', 'METEOROLOGY',
      'ECOLOGY', 'GENETICS', 'MICROBIOLOGY', 'BOTANY', 'ZOOLOGY', 'ANATOMY',
      'PHYSIOLOGY', 'NEUROLOGY', 'CARDIOLOGY', 'ONCOLOGY', 'RADIOLOGY',
      'LABORATORY', 'EXPERIMENT', 'RESEARCH', 'HYPOTHESIS', 'THEORY',
      'MOLECULE', 'ATOM', 'ELECTRON', 'PROTON', 'NEUTRON', 'CELL',
      'TISSUE', 'ORGAN', 'SYSTEM', 'SPECIES', 'GENUS', 'FAMILY',
      'KINGDOM', 'PHYLUM', 'CLASS', 'ORDER', 'FAMILY', 'GENUS'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-gray-400 to-slate-500',
    words: [
      'COMPANY', 'CORPORATION', 'ENTERPRISE', 'ORGANIZATION', 'INDUSTRY',
      'MARKET', 'ECONOMY', 'FINANCE', 'INVESTMENT', 'STOCK', 'BOND',
      'CURRENCY', 'EXCHANGE', 'TRADE', 'COMMERCE', 'RETAIL', 'WHOLESALE',
      'MANUFACTURING', 'PRODUCTION', 'DISTRIBUTION', 'LOGISTICS', 'SUPPLY',
      'DEMAND', 'PRICE', 'COST', 'PROFIT', 'REVENUE', 'INCOME', 'EXPENSE',
      'BUDGET', 'ACCOUNTING', 'AUDITING', 'TAXATION', 'INSURANCE', 'BANKING',
      'CREDIT', 'LOAN', 'MORTGAGE', 'INTEREST', 'PRINCIPAL', 'PAYMENT'
    ]
  }
];

export const getRandomTheme = (difficulty?: string): Theme => {
  if (difficulty) {
    const filteredThemes = themes.filter(theme => theme.difficulty === difficulty);
    return filteredThemes[Math.floor(Math.random() * filteredThemes.length)];
  }
  return themes[Math.floor(Math.random() * themes.length)];
};

export const getThemesByDifficulty = (difficulty: string): Theme[] => {
  return themes.filter(theme => theme.difficulty === difficulty);
};