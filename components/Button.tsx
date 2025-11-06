
import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'secondary', className = '', ...props }) => {
  const { activeTheme } = useTheme();

  const baseClasses = 'w-full px-4 py-3 rounded-lg font-semibold text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = variant === 'primary' 
    ? activeTheme.primaryButton 
    : activeTheme.secondaryButton;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// A dummy hook to pass theme context to buttons, since we can't use real context.
// In a real app, this would use React.Context.
const useTheme = () => {
    // This is a simplified stand-in. In the actual App.tsx, the theme object is passed down.
    // This button will get its theme styles from the parent. This hook is a placeholder for structure.
    return {
        activeTheme: {
            primaryButton: 'bg-purple-600 hover:bg-purple-700 text-white',
            secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-gray-300',
        }
    };
};


export default Button;
