import { Theme } from './types';

export const THEMES: Theme[] = [
  {
    name: 'Purple',
    colors: {
      bg: '#111827',
      cardBg: '#1f2937',
      text: '#e5e7eb',
      textSecondary: '#9ca3af',
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      secondary: '#374151',
      secondaryHover: '#4b5563',
    },
  },
  {
    name: 'Green',
    colors: {
      bg: '#062016',
      cardBg: '#0b3122',
      text: '#d1fae5',
      textSecondary: '#a7f3d0',
      primary: '#10b981',
      primaryHover: '#059669',
      secondary: '#1f2937',
      secondaryHover: '#374151',
    },
  },
  {
    name: 'Light Blue',
    colors: {
      bg: '#0c1a32',
      cardBg: '#182c4f',
      text: '#dbeafe',
      textSecondary: '#bfdbfe',
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      secondary: '#374151',
      secondaryHover: '#4b5563',
    },
  },
   {
    name: 'Sunset',
    colors: {
      bg: '#2c131e',
      cardBg: '#441c2f',
      text: '#fee2e2',
      textSecondary: '#fecaca',
      primary: '#f43f5e',
      primaryHover: '#e11d48',
      secondary: '#5b21b6',
      secondaryHover: '#4c1d95',
    },
  },
  {
    name: 'Islamic',
    colors: {
      bg: '#042f2e',
      cardBg: '#064e4b',
      text: '#cceae7',
      textSecondary: '#a6e4dc',
      primary: '#f59e0b',
      primaryHover: '#d97706',
      secondary: '#166534',
      secondaryHover: '#14532d',
    },
  },
];

export const CHAR_MAP: { [key: string]: string } = {
  'a': '😀', 'b': '😃', 'c': '😄', 'd': '😁', 'e': '😆', 'f': '😅',
  'g': '😂', 'h': '🤣', 'i': '😊', 'j': '😇', 'k': '🙂', 'l': '🙃',
  'm': '😉', 'n': '😌', 'o': '😍', 'p': '🥰', 'q': '😘', 'r': '😗',
  's': '😙', 't': '😚', 'u': '😋', 'v': '😛', 'w': '😝', 'x': '😜',
  'y': '🤪', 'z': '🤨', ' ': '␣'
};

export const EMOJI_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(CHAR_MAP).map(([key, value]) => [value, key])
);
