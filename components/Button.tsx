import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = 'w-full text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'text-white',
    secondary: 'text-white',
  };

  const buttonStyle: React.CSSProperties = {
     backgroundColor: variant === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)',
     '--tw-ring-color': 'var(--primary-color)'
  } as React.CSSProperties;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={buttonStyle}
      onMouseEnter={e => {
        if(variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--primary-hover-color)';
        else e.currentTarget.style.backgroundColor = 'var(--secondary-hover-color)';
      }}
      onMouseLeave={e => {
        if(variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--primary-color)';
        else e.currentTarget.style.backgroundColor = 'var(--secondary-color)';
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
