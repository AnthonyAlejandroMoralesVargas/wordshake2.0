import { Theme } from '../types';

export const themes: Theme[] = [
  // BEGINNER THEMES (8 themes)
  {
    id: 'friendship',
    name: 'Friendship Descriptors',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-pink-400 to-rose-500',
    words: [
      'LOYAL', 'HONEST', 'KIND', 'CARING', 'FUNNY', 'SMART', 'NICE', 'SWEET',
      'TRUST', 'HELP', 'SHARE', 'LAUGH', 'TALK', 'LISTEN', 'SUPPORT', 'ENJOY',
      'FRIENDLY', 'CHEERFUL', 'HAPPY', 'GOOD', 'TRUE', 'REAL', 'CLOSE', 'BEST',
      'SPECIAL', 'AMAZING', 'WONDERFUL', 'GREAT', 'FANTASTIC', 'AWESOME',
      'RELIABLE', 'TRUSTWORTHY', 'UNDERSTANDING', 'PATIENT', 'GENEROUS'
    ]
  },
  {
    id: 'basic_style',
    name: 'Basic Style & Appearance',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-purple-400 to-pink-500',
    words: [
      'CASUAL', 'FORMAL', 'SMART', 'NEAT', 'MESSY', 'CLEAN', 'DIRTY', 'NEW',
      'OLD', 'MODERN', 'CLASSIC', 'SIMPLE', 'FANCY', 'PLAIN', 'BRIGHT',
      'DARK', 'LIGHT', 'COLORFUL', 'STYLISH', 'FASHIONABLE', 'TRENDY',
      'COMFORTABLE', 'TIGHT', 'LOOSE', 'SHORT', 'LONG', 'BIG', 'SMALL',
      'BEAUTIFUL', 'PRETTY', 'HANDSOME', 'UGLY', 'ATTRACTIVE', 'NICE',
      'GOOD', 'BAD', 'PERFECT', 'TERRIBLE'
    ]
  },
  {
    id: 'simple_technology',
    name: 'Basic Technology Issues',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    words: [
      'FAST', 'SLOW', 'EASY', 'HARD', 'SIMPLE', 'DIFFICULT', 'USEFUL',
      'USELESS', 'GOOD', 'BAD', 'NEW', 'OLD', 'BROKEN', 'WORKING', 'FIXED',
      'UPDATED', 'OUTDATED', 'SAFE', 'DANGEROUS', 'SECURE', 'RISKY',
      'EXPENSIVE', 'CHEAP', 'FREE', 'PAID', 'ONLINE', 'OFFLINE', 'CONNECTED',
      'DISCONNECTED', 'AVAILABLE', 'UNAVAILABLE', 'POPULAR', 'UNPOPULAR',
      'MODERN', 'TRADITIONAL', 'ADVANCED', 'BASIC'
    ]
  },
  {
    id: 'basic_luck',
    name: 'Simple Luck Expressions',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-green-400 to-emerald-500',
    words: [
      'LUCKY', 'UNLUCKY', 'FORTUNE', 'CHANCE', 'HOPE', 'WISH', 'DREAM',
      'SUCCESS', 'FAILURE', 'WIN', 'LOSE', 'GOOD', 'BAD', 'HAPPY', 'SAD',
      'POSITIVE', 'NEGATIVE', 'POSSIBLE', 'IMPOSSIBLE', 'EASY', 'HARD',
      'BETTER', 'WORSE', 'BEST', 'WORST', 'FIRST', 'LAST', 'WINNER',
      'LOSER', 'CHAMPION', 'PRIZE', 'REWARD', 'GIFT', 'SURPRISE', 'MAGIC'
    ]
  },
  {
    id: 'basic_movies',
    name: 'Basic Movie Types',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    words: [
      'COMEDY', 'DRAMA', 'ACTION', 'ROMANCE', 'HORROR', 'THRILLER', 'ADVENTURE',
      'FANTASY', 'SCIENCE', 'FICTION', 'ANIMATION', 'CARTOON', 'DOCUMENTARY',
      'MUSICAL', 'WESTERN', 'MYSTERY', 'CRIME', 'WAR', 'HISTORICAL', 'FAMILY',
      'CHILDREN', 'TEEN', 'ADULT', 'CLASSIC', 'MODERN', 'OLD', 'NEW',
      'POPULAR', 'FAMOUS', 'UNKNOWN', 'FOREIGN', 'AMERICAN', 'EUROPEAN',
      'LONG', 'SHORT', 'BORING', 'EXCITING', 'FUNNY', 'SCARY'
    ]
  },
  {
    id: 'tv_programs',
    name: 'TV Program Types',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-red-400 to-pink-500',
    words: [
      'NEWS', 'SPORTS', 'WEATHER', 'COMEDY', 'DRAMA', 'REALITY', 'GAME',
      'TALK', 'VARIETY', 'MUSIC', 'DANCE', 'COOKING', 'TRAVEL', 'NATURE',
      'SCIENCE', 'HISTORY', 'DOCUMENTARY', 'CARTOON', 'CHILDREN', 'TEEN',
      'SOAP', 'OPERA', 'SERIES', 'EPISODE', 'SEASON', 'CHANNEL', 'PROGRAM',
      'SHOW', 'BROADCAST', 'LIVE', 'RECORDED', 'REPEAT', 'PREMIERE',
      'FINALE', 'COMMERCIAL', 'ADVERTISEMENT'
    ]
  },
  {
    id: 'basic_music',
    name: 'Basic Music Terms',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-violet-400 to-purple-500',
    words: [
      'MUSIC', 'SONG', 'SINGER', 'BAND', 'ALBUM', 'CONCERT', 'LIVE', 'STUDIO',
      'ROCK', 'POP', 'JAZZ', 'CLASSICAL', 'COUNTRY', 'FOLK', 'BLUES',
      'ELECTRONIC', 'DANCE', 'RAP', 'HIP', 'HOP', 'REGGAE', 'LATIN',
      'FAST', 'SLOW', 'LOUD', 'QUIET', 'SOFT', 'HARD', 'BEAUTIFUL',
      'UGLY', 'GOOD', 'BAD', 'POPULAR', 'UNKNOWN', 'OLD', 'NEW', 'MODERN',
      'CLASSIC', 'FAVORITE', 'BORING', 'EXCITING'
    ]
  },
  {
    id: 'simple_shopping',
    name: 'Basic Shopping Terms',
    difficulty: 'beginner',
    color: 'bg-gradient-to-br from-amber-400 to-yellow-500',
    words: [
      'SHOP', 'STORE', 'MARKET', 'MALL', 'SUPERMARKET', 'BUY', 'SELL',
      'PRICE', 'COST', 'MONEY', 'CHEAP', 'EXPENSIVE', 'FREE', 'SALE',
      'DISCOUNT', 'OFFER', 'DEAL', 'BARGAIN', 'CASH', 'CARD', 'CREDIT',
      'DEBIT', 'RECEIPT', 'CHANGE', 'CUSTOMER', 'SELLER', 'CASHIER',
      'QUEUE', 'LINE', 'PAYMENT', 'PURCHASE', 'PRODUCT', 'ITEM', 'GOODS',
      'QUALITY', 'QUANTITY', 'SIZE', 'COLOR', 'BRAND'
    ]
  },

  // INTERMEDIATE THEMES (8 themes)
  {
    id: 'reverbs',
    name: 'Re-verbs',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    words: [
      'REBUILD', 'RECONSTRUCT', 'REORGANIZE', 'RESTRUCTURE', 'REFORM',
      'REFURBISH', 'RENOVATE', 'RESTORE', 'REVIVE', 'REFRESH', 'RENEW',
      'REPLACE', 'RELOCATE', 'REDIRECT', 'REDESIGN', 'REARRANGE', 'READJUST',
      'RECONSIDER', 'RETHINK', 'REVIEW', 'REVISE', 'REWRITE', 'REDO',
      'REPEAT', 'REPLAY', 'RESTART', 'RESUME', 'RETURN', 'REVERSE',
      'RECOVER', 'RECYCLE', 'REDUCE', 'REJECT', 'REFUSE', 'REGRET'
    ]
  },
  {
    id: 'style_appearance',
    name: 'Style & Outward Appearance',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-rose-400 to-pink-500',
    words: [
      'SOPHISTICATED', 'ELEGANT', 'CHIC', 'TRENDY', 'FASHIONABLE', 'STYLISH',
      'CONSERVATIVE', 'PROGRESSIVE', 'MINIMALIST', 'EXTRAVAGANT', 'FLAMBOYANT',
      'UNDERSTATED', 'BOLD', 'SUBTLE', 'REFINED', 'POLISHED', 'GROOMED',
      'DISHEVELED', 'UNKEMPT', 'SHABBY', 'SCRUFFY', 'IMMACULATE', 'PRISTINE',
      'DISTINCTIVE', 'UNIQUE', 'CONVENTIONAL', 'MAINSTREAM', 'ALTERNATIVE',
      'VINTAGE', 'RETRO', 'CONTEMPORARY', 'CLASSIC', 'TIMELESS', 'OUTDATED',
      'COORDINATED', 'MISMATCHED', 'COMPLEMENTARY', 'CONTRASTING'
    ]
  },
  {
    id: 'tech_attitudes',
    name: 'Technology & Attitudes',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-indigo-400 to-purple-500',
    words: [
      'INNOVATIVE', 'CUTTING-EDGE', 'STATE-OF-THE-ART', 'REVOLUTIONARY',
      'GROUNDBREAKING', 'OBSOLETE', 'OUTDATED', 'PRIMITIVE', 'ARCHAIC',
      'RELIABLE', 'UNRELIABLE', 'EFFICIENT', 'INEFFICIENT', 'USER-FRIENDLY',
      'COMPLICATED', 'INTUITIVE', 'CONFUSING', 'ACCESSIBLE', 'INACCESSIBLE',
      'COMPATIBLE', 'INCOMPATIBLE', 'INTEGRATED', 'STANDALONE', 'WIRELESS',
      'PORTABLE', 'STATIONARY', 'AUTOMATED', 'MANUAL', 'DIGITAL', 'ANALOG',
      'VIRTUAL', 'PHYSICAL', 'SECURE', 'VULNERABLE', 'UPGRADED', 'DOWNGRADED'
    ]
  },
  {
    id: 'attitude_collocations',
    name: 'Attitude Collocations',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-emerald-400 to-green-500',
    words: [
      'POSITIVE', 'ATTITUDE', 'NEGATIVE', 'OUTLOOK', 'OPTIMISTIC', 'APPROACH',
      'PESSIMISTIC', 'PERSPECTIVE', 'ENTHUSIASTIC', 'RESPONSE', 'SKEPTICAL',
      'VIEWPOINT', 'CRITICAL', 'THINKING', 'OPEN', 'MINDED', 'NARROW',
      'FOCUSED', 'FLEXIBLE', 'MINDSET', 'RIGID', 'STANCE', 'BALANCED',
      'JUDGMENT', 'BIASED', 'OPINION', 'OBJECTIVE', 'ANALYSIS', 'SUBJECTIVE',
      'INTERPRETATION', 'CONSTRUCTIVE', 'CRITICISM', 'DESTRUCTIVE', 'FEEDBACK',
      'SUPPORTIVE', 'ENVIRONMENT', 'HOSTILE', 'ATMOSPHERE'
    ]
  },
  {
    id: 'truth_fabrication',
    name: 'Truth & Fabrication',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-teal-400 to-cyan-500',
    words: [
      'TRUTHFUL', 'HONEST', 'ACCURATE', 'PRECISE', 'EXACT', 'AUTHENTIC',
      'GENUINE', 'RELIABLE', 'CREDIBLE', 'TRUSTWORTHY', 'FACTUAL', 'REAL',
      'FALSE', 'FAKE', 'FABRICATED', 'INVENTED', 'FICTIONAL', 'IMAGINARY',
      'MISLEADING', 'DECEPTIVE', 'DISHONEST', 'FRAUDULENT', 'COUNTERFEIT',
      'FORGED', 'EXAGGERATED', 'DISTORTED', 'BIASED', 'PARTIAL', 'OBJECTIVE',
      'IMPARTIAL', 'NEUTRAL', 'BALANCED', 'UNFOUNDED', 'BASELESS', 'VERIFIED',
      'CONFIRMED', 'DISPUTED', 'QUESTIONABLE', 'DOUBTFUL', 'SUSPICIOUS'
    ]
  },
  {
    id: 'entertainment_idioms',
    name: 'Entertainment Industry Idioms',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-orange-400 to-red-500',
    words: [
      'BREAK', 'LEG', 'SHOW', 'MUST', 'GO', 'ON', 'STEAL', 'SPOTLIGHT',
      'CURTAIN', 'CALL', 'STANDING', 'OVATION', 'TOUGH', 'ACT', 'FOLLOW',
      'BEHIND', 'SCENES', 'CENTER', 'STAGE', 'LIMELIGHT', 'SILVER', 'SCREEN',
      'BOX', 'OFFICE', 'HIT', 'BLOCKBUSTER', 'FLOP', 'BOMB', 'SLEEPER',
      'CULT', 'CLASSIC', 'CRITICS', 'CHOICE', 'AUDIENCE', 'FAVORITE',
      'OPENING', 'NIGHT', 'CLOSING', 'PREMIERE', 'ENCORE', 'FINALE'
    ]
  },
  {
    id: 'music_collocations',
    name: 'Music Collocations',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-purple-400 to-violet-500',
    words: [
      'CHART', 'TOPPER', 'PLATINUM', 'ALBUM', 'GOLD', 'RECORD', 'HIT', 'SINGLE',
      'DEBUT', 'RELEASE', 'LIVE', 'PERFORMANCE', 'STUDIO', 'SESSION',
      'WORLD', 'TOUR', 'SOLD', 'OUT', 'CONCERT', 'ACOUSTIC', 'VERSION',
      'REMIX', 'COVER', 'ORIGINAL', 'COMPOSITION', 'INSTRUMENTAL', 'VOCAL',
      'HARMONY', 'MELODY', 'RHYTHM', 'BEAT', 'TEMPO', 'GENRE', 'STYLE',
      'SOUND', 'QUALITY', 'PRODUCTION', 'VALUE', 'MUSICAL', 'TALENT',
      'ARTISTIC', 'EXPRESSION', 'CREATIVE', 'PROCESS'
    ]
  },
  {
    id: 'marketing_basics',
    name: 'Basic Marketing Strategies',
    difficulty: 'intermediate',
    color: 'bg-gradient-to-br from-lime-400 to-green-500',
    words: [
      'TARGET', 'AUDIENCE', 'MARKET', 'RESEARCH', 'CONSUMER', 'BEHAVIOR',
      'BRAND', 'AWARENESS', 'PRODUCT', 'LAUNCH', 'ADVERTISING', 'CAMPAIGN',
      'PROMOTIONAL', 'STRATEGY', 'SALES', 'PITCH', 'CUSTOMER', 'SERVICE',
      'MARKET', 'SHARE', 'COMPETITIVE', 'ADVANTAGE', 'PRICE', 'POINT',
      'DISTRIBUTION', 'CHANNEL', 'SUPPLY', 'CHAIN', 'RETAIL', 'OUTLET',
      'ONLINE', 'PRESENCE', 'SOCIAL', 'MEDIA', 'DIGITAL', 'MARKETING',
      'WORD', 'MOUTH', 'VIRAL', 'CONTENT', 'ENGAGEMENT', 'CONVERSION'
    ]
  },

  // ADVANCED THEMES (8 themes)
  {
    id: 'antonym_prefixes',
    name: 'Antonym Prefixes',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-slate-400 to-gray-500',
    words: [
      'INAPPROPRIATE', 'INADEQUATE', 'INACCURATE', 'INCOMPLETE', 'INCORRECT',
      'INCONSISTENT', 'INDEPENDENT', 'INDIRECT', 'INEFFECTIVE', 'INEFFICIENT',
      'UNACCEPTABLE', 'UNAVAILABLE', 'UNCOMFORTABLE', 'UNCONSCIOUS',
      'UNCONVENTIONAL', 'UNCOOPERATIVE', 'UNDENIABLE', 'UNDERESTIMATE',
      'UNEMPLOYMENT', 'UNFAVORABLE', 'UNFORTUNATE', 'UNNECESSARY', 'UNPOPULAR',
      'UNREASONABLE', 'UNSUCCESSFUL', 'DISSATISFIED', 'DISAGREEMENT',
      'DISAPPROVAL', 'DISADVANTAGE', 'DISCOURAGE', 'DISHONEST', 'DISRESPECT',
      'MISUNDERSTAND', 'MISCOMMUNICATION', 'MISBEHAVIOR', 'MISCONDUCT'
    ]
  },
  {
    id: 'change_collocations',
    name: 'Advanced Change Collocations',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    words: [
      'FUNDAMENTAL', 'CHANGE', 'RADICAL', 'TRANSFORMATION', 'SWEEPING',
      'REFORMS', 'GRADUAL', 'EVOLUTION', 'SUDDEN', 'SHIFT', 'DRAMATIC',
      'ALTERATION', 'SUBTLE', 'MODIFICATION', 'COMPREHENSIVE', 'OVERHAUL',
      'SYSTEMATIC', 'REORGANIZATION', 'STRATEGIC', 'REALIGNMENT', 'CULTURAL',
      'REVOLUTION', 'TECHNOLOGICAL', 'ADVANCEMENT', 'PARADIGM', 'SHIFT',
      'STRUCTURAL', 'ADJUSTMENT', 'ORGANIZATIONAL', 'DEVELOPMENT', 'PROCESS',
      'IMPROVEMENT', 'CONTINUOUS', 'INNOVATION', 'DISRUPTIVE', 'BREAKTHROUGH',
      'INCREMENTAL', 'PROGRESS', 'EVOLUTIONARY', 'ADAPTATION'
    ]
  },
  {
    id: 'advanced_shopping',
    name: 'Advanced Shopping Expressions',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-amber-400 to-orange-500',
    words: [
      'CONSUMER', 'SPENDING', 'PURCHASING', 'POWER', 'DISPOSABLE', 'INCOME',
      'RETAIL', 'THERAPY', 'IMPULSE', 'BUYING', 'COMPARISON', 'SHOPPING',
      'WINDOW', 'SHOPPING', 'BARGAIN', 'HUNTING', 'PRICE', 'CONSCIOUS',
      'BRAND', 'LOYALTY', 'CUSTOMER', 'RETENTION', 'REPEAT', 'BUSINESS',
      'SEASONAL', 'SALES', 'CLEARANCE', 'MERCHANDISE', 'INVENTORY',
      'TURNOVER', 'PROFIT', 'MARGIN', 'MARKET', 'PENETRATION', 'CONSUMER',
      'CONFIDENCE', 'ECONOMIC', 'INDICATORS', 'SPENDING', 'HABITS',
      'DEMOGRAPHIC', 'TRENDS', 'PURCHASING', 'DECISIONS'
    ]
  },
  {
    id: 'animal_features',
    name: 'Physical Features of Animals',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-green-400 to-emerald-500',
    words: [
      'PREDATORY', 'INSTINCTS', 'CARNIVOROUS', 'HERBIVOROUS', 'OMNIVOROUS',
      'NOCTURNAL', 'DIURNAL', 'MIGRATORY', 'TERRITORIAL', 'CAMOUFLAGE',
      'ADAPTATION', 'EVOLUTION', 'DOMESTICATION', 'HIBERNATION', 'MIGRATION',
      'REPRODUCTION', 'METAMORPHOSIS', 'VERTEBRATE', 'INVERTEBRATE',
      'MAMMALIAN', 'REPTILIAN', 'AMPHIBIAN', 'AVIAN', 'AQUATIC', 'TERRESTRIAL',
      'ARBOREAL', 'FOSSORIAL', 'AERIAL', 'BIPEDAL', 'QUADRUPEDAL',
      'ENDANGERED', 'EXTINCT', 'CONSERVATION', 'BIODIVERSITY', 'ECOSYSTEM',
      'FOOD', 'CHAIN', 'NATURAL', 'SELECTION', 'GENETIC', 'DIVERSITY'
    ]
  },
  {
    id: 'nature_idioms',
    name: 'Nature-related Idioms',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    words: [
      'BARK', 'WORSE', 'THAN', 'BITE', 'BEAT', 'AROUND', 'BUSH', 'BUSY',
      'BEE', 'CALM', 'BEFORE', 'STORM', 'DARK', 'HORSE', 'EARLY', 'BIRD',
      'CATCHES', 'WORM', 'FISH', 'OUT', 'WATER', 'HOLD', 'YOUR', 'HORSES',
      'KILL', 'TWO', 'BIRDS', 'ONE', 'STONE', 'LET', 'SLEEPING', 'DOGS',
      'LIE', 'MAKE', 'MOUNTAIN', 'MOLEHILL', 'RAINING', 'CATS', 'DOGS',
      'WILD', 'GOOSE', 'CHASE', 'WOLF', 'SHEEP', 'CLOTHING', 'NATURE',
      'VERSUS', 'NURTURE', 'MOTHER', 'EARTH', 'FORCE'
    ]
  },
  {
    id: 'discourse_markers',
    name: 'Advanced Discourse Markers',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-violet-400 to-purple-500',
    words: [
      'FURTHERMORE', 'MOREOVER', 'NEVERTHELESS', 'NONETHELESS', 'CONSEQUENTLY',
      'SUBSEQUENTLY', 'SIMULTANEOUSLY', 'ALTERNATIVELY', 'CONVERSELY',
      'SPECIFICALLY', 'PARTICULARLY', 'ESSENTIALLY', 'FUNDAMENTALLY',
      'ULTIMATELY', 'INITIALLY', 'PREVIOUSLY', 'SUBSEQUENTLY', 'MEANWHILE',
      'THEREAFTER', 'HENCEFORTH', 'NOTWITHSTANDING', 'NONETHELESS',
      'ADMITTEDLY', 'UNDOUBTEDLY', 'PRESUMABLY', 'APPARENTLY', 'EVIDENTLY',
      'OBVIOUSLY', 'CLEARLY', 'CERTAINLY', 'DEFINITELY', 'ABSOLUTELY',
      'RELATIVELY', 'COMPARATIVELY', 'INCREASINGLY', 'PROGRESSIVELY'
    ]
  },
  {
    id: 'language_idioms',
    name: 'Language Use Idioms',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-rose-400 to-red-500',
    words: [
      'BEAT', 'AROUND', 'BUSH', 'BREAK', 'ICE', 'CALL', 'SPADE', 'SPADE',
      'CUT', 'LONG', 'STORY', 'SHORT', 'GET', 'STRAIGHT', 'POINT', 'HEAR',
      'THROUGH', 'GRAPEVINE', 'KEEP', 'UNDER', 'WRAPS', 'LOST', 'WORDS',
      'MINCE', 'WORDS', 'PUT', 'WORDS', 'MOUTH', 'READ', 'BETWEEN', 'LINES',
      'SPEAK', 'SAME', 'LANGUAGE', 'TONGUE', 'TIED', 'WORD', 'MOUTH',
      'ACTIONS', 'SPEAK', 'LOUDER', 'THAN', 'LOST', 'TRANSLATION',
      'CRYSTAL', 'CLEAR', 'CRYSTAL', 'COMMUNICATION', 'BREAKDOWN'
    ]
  },
  {
    id: 'workplace_success',
    name: 'Workplace Success Expressions',
    difficulty: 'advanced',
    color: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    words: [
      'CAREER', 'ADVANCEMENT', 'PROFESSIONAL', 'DEVELOPMENT', 'LEADERSHIP',
      'POTENTIAL', 'PERFORMANCE', 'EVALUATION', 'ACHIEVEMENT', 'RECOGNITION',
      'PROMOTION', 'OPPORTUNITIES', 'SKILL', 'ENHANCEMENT', 'COMPETENCY',
      'BUILDING', 'NETWORKING', 'RELATIONSHIPS', 'COLLABORATIVE', 'TEAMWORK',
      'STRATEGIC', 'THINKING', 'PROBLEM', 'SOLVING', 'DECISION', 'MAKING',
      'INNOVATION', 'CREATIVITY', 'ADAPTABILITY', 'FLEXIBILITY', 'RESILIENCE',
      'PERSEVERANCE', 'WORK', 'ETHIC', 'PRODUCTIVITY', 'EFFICIENCY',
      'EXCELLENCE', 'ACHIEVEMENT', 'SUCCESS', 'FACTORS', 'COMPETITIVE',
      'EDGE', 'MARKET', 'VALUE', 'PERSONAL', 'BRANDING'
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