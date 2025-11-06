import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${className}`}
      style={{ backgroundColor: 'var(--card-bg-color)' }}
    >
      {children}
    </div>
  );
};

export default Card;
