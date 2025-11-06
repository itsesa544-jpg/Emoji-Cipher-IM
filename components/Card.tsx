import React from 'react';

// FIX: Extend React.HTMLAttributes<HTMLDivElement> to allow passing standard div props like onClick.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      // FIX: Use `className || ''` to avoid adding "undefined" to the class list when className is not provided.
      className={`rounded-xl p-6 shadow-lg ${className || ''}`}
      style={{ backgroundColor: 'var(--card-bg-color)' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
