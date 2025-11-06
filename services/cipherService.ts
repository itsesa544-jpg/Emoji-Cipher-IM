
import { CHARACTER_SET, EMOJI_SET } from '../constants';

// A simple Linear Congruential Generator for seeded random numbers
const createSeededRandom = (seed: number) => {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
};

export const generateMapping = (passphrase: string): { mapping: Map<string, string>, inverseMapping: Map<string, string> } => {
  let seed = 12345;
  if (passphrase) {
    seed = passphrase.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  const random = createSeededRandom(seed);
  
  // Fisher-Yates shuffle
  const shuffledEmojis = [...EMOJI_SET];
  for (let i = shuffledEmojis.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffledEmojis[i], shuffledEmojis[j]] = [shuffledEmojis[j], shuffledEmojis[i]];
  }

  const mapping = new Map<string, string>();
  const inverseMapping = new Map<string, string>();
  
  CHARACTER_SET.forEach((char, index) => {
    const emoji = shuffledEmojis[index % shuffledEmojis.length];
    mapping.set(char, emoji);
    inverseMapping.set(emoji, char);
  });

  return { mapping, inverseMapping };
};


export const encode = (text: string, mapping: Map<string, string>): string => {
  return text
    .split('')
    .map(char => mapping.get(char) || char)
    .join('');
};

export const decode = (emojiText: string, inverseMapping: Map<string, string>): string => {
  // Use a regex that matches any character, including Unicode astral symbols (like emojis)
  const emojis = [...emojiText];

  return emojis
    .map(emoji => {
      const char = inverseMapping.get(emoji);
      if (char === undefined) {
         // If an emoji is not in the map, it might be a character that wasn't encoded.
         // Or it could be part of an invalid sequence. We check if the original "emoji"
         // is part of the original character set. If so, return it.
         // Otherwise, it indicates a decoding error.
         if (CHARACTER_SET.includes(emoji)) {
           return emoji;
         }
         throw new Error(`Invalid emoji in sequence: ${emoji}`);
      }
      return char;
    })
    .join('');
};
