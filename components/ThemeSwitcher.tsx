
import React from 'react';
import { Theme, ThemeName } from '../types';

interface ThemeSwitcherProps {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: Record<ThemeName, Theme>;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const formatName = (name: string) => name.replace(/([A-Z])/g, ' $1').trim();

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme, themes }) => {
  const activeTheme = themes[currentTheme];

  return (
    <div className="flex justify-center items-center flex-wrap gap-2 mb-8 p-2 rounded-xl bg-gray-800/50">
      {(Object.keys(themes) as ThemeName[]).map((themeName) => (
        <button
          key={themeName}
          onClick={() => setTheme(themeName)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
            currentTheme === themeName
              ? activeTheme.activeTab
              : activeTheme.inactiveTab
          }`}
        >
          {capitalize(formatName(themeName))}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
