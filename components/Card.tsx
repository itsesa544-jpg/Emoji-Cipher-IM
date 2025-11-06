
import React from 'react';
import { Theme } from '../types';

interface CardProps {
  children: React.ReactNode;
  theme: Theme;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, theme, className = '' }) => {
  return (
    <div className={`p-4 sm:p-6 rounded-xl shadow-lg transition-colors duration-500 ${theme.card} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
