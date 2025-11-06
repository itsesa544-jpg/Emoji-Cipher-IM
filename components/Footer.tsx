import React from 'react';

interface FooterProps {
  onOpenInfo: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenInfo }) => {
  return (
    <footer className="w-full max-w-2xl mx-auto text-center mt-8 pb-4">
      <button
        onClick={onOpenInfo}
        className="text-sm transition-colors duration-200"
        style={{ color: 'var(--text-secondary-color)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-color)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary-color)'}
      >
        Powered by 🌐 IM Softwark
      </button>
    </footer>
  );
};

export default Footer;
