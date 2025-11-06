
import { Theme, ThemeName } from './types';

export const THEMES: Record<ThemeName, Theme> = {
  purple: {
    bg: 'bg-[#0d1117]',
    card: 'bg-[#161b22]',
    text: 'text-gray-300',
    title: 'text-white',
    primaryButton: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-gray-300',
    input: 'bg-[#0d1117] border-gray-700 text-gray-300 focus:ring-purple-500 focus:border-purple-500',
    activeTab: 'bg-purple-600 text-white',
    inactiveTab: 'text-gray-400 hover:text-white hover:bg-gray-700',
    modalBg: 'bg-black/70',
    modalContent: 'bg-[#161b22] border border-gray-700',
  },
  green: {
    bg: 'bg-green-900/10',
    card: 'bg-green-900/20',
    text: 'text-green-100',
    title: 'text-white',
    primaryButton: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    secondaryButton: 'bg-green-800 hover:bg-green-700 text-green-100',
    input: 'bg-green-900/30 border-green-700 text-green-100 focus:ring-emerald-500 focus:border-emerald-500',
    activeTab: 'bg-emerald-500 text-white',
    inactiveTab: 'text-green-200 hover:text-white hover:bg-green-800',
    modalBg: 'bg-black/70',
    modalContent: 'bg-green-900/95 border border-green-700',
  },
  lightBlue: {
    bg: 'bg-sky-900',
    card: 'bg-sky-800',
    text: 'text-sky-100',
    title: 'text-white',
    primaryButton: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    secondaryButton: 'bg-sky-700 hover:bg-sky-600 text-sky-100',
    input: 'bg-sky-900 border-sky-600 text-sky-100 focus:ring-cyan-500 focus:border-cyan-500',
    activeTab: 'bg-cyan-500 text-white',
    inactiveTab: 'text-sky-200 hover:text-white hover:bg-sky-700',
    modalBg: 'bg-black/70',
    modalContent: 'bg-sky-800 border border-sky-600',
  },
  sunset: {
    bg: 'bg-gray-800',
    card: 'bg-gray-700',
    text: 'text-orange-100',
    title: 'text-white',
    primaryButton: 'bg-orange-600 hover:bg-orange-700 text-white',
    secondaryButton: 'bg-gray-600 hover:bg-gray-500 text-orange-100',
    input: 'bg-gray-800 border-gray-500 text-orange-100 focus:ring-orange-500 focus:border-orange-500',
    activeTab: 'bg-orange-600 text-white',
    inactiveTab: 'text-orange-200 hover:text-white hover:bg-gray-600',
    modalBg: 'bg-black/70',
    modalContent: 'bg-gray-700 border border-gray-500',
  },
  islamic: {
    bg: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-emerald-100',
    title: 'text-white',
    primaryButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-emerald-100',
    input: 'bg-gray-900 border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500',
    activeTab: 'bg-emerald-600 text-white',
    inactiveTab: 'text-emerald-200 hover:text-white hover:bg-gray-700',
    modalBg: 'bg-black/70',
    modalContent: 'bg-gray-800 border border-gray-600',
  },
};

export const CHARACTER_SET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:\'",./<>? `\n\t'.split('');

export const EMOJI_SET = [
  '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚',
  '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴',
  '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤',
  '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😡', '😠', '🤬',
  '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🥳', '🥴', '🥺', '🤥', '🤫', '🤭', '🧐', '🤓', '😈',
  '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈'
];
