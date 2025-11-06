import { CHAR_MAP, EMOJI_MAP } from '../constants';

// Simple seeded pseudo-random number generator ( mulberry32 )
const mulberry32 = (seed: number) => {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Create a seed from the passphrase string
const createSeed = (str: string): number => {
  let h = 1779033703, i, char;
  if (!str) return h;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    h = (h ^ char) * 16777619;
  }
  return h;
};

// Fisher-Yates shuffle algorithm
const shuffle = <T,>(array: T[], random: () => number): T[] => {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
};

export const generateCipherMaps = (passphrase: string): { charMap: { [key: string]: string }, emojiMap: { [key: string]: string } } => {
  if (!passphrase) {
    return { charMap: CHAR_MAP, emojiMap: EMOJI_MAP };
  }

  const seed = createSeed(passphrase);
  const random = mulberry32(seed);

  const characters = Object.keys(CHAR_MAP).filter(c => c !== ' ' && c !== '\n' && c !== '\t'); // Keep space, newline, and tab consistent
  const emojis = characters.map(c => CHAR_MAP[c]);
  const shuffledEmojis = shuffle(emojis, random);

  const newCharMap: { [key: string]: string } = { ' ': CHAR_MAP[' '], '\n': CHAR_MAP['\n'], '\t': CHAR_MAP['\t'] };
  characters.forEach((char, index) => {
    newCharMap[char] = shuffledEmojis[index];
  });
  
  const newEmojiMap: { [key: string]: string } = Object.fromEntries(
    Object.entries(newCharMap).map(([key, value]) => [value, key])
  );

  return { charMap: newCharMap, emojiMap: newEmojiMap };
};