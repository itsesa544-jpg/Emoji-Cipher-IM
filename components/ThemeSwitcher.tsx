import React from 'react';
import { Theme } from '../types';

interface ThemeSwitcherProps {
  themes: Theme[];
  activeTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ themes, activeTheme, setTheme }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-2 rounded-full" style={{ backgroundColor: 'var(--card-bg-color)' }}>
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => setTheme(theme)}
          className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-200 ${
            activeTheme.name === theme.name ? 'text-white' : ''
          }`}
          style={{
            backgroundColor: activeTheme.name === theme.name ? 'var(--primary-color)' : 'transparent',
            color: activeTheme.name === theme.name ? '#fff' : 'var(--text-secondary-color)'
          }}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
