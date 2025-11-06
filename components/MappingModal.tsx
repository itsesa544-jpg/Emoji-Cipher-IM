
import React, { useEffect } from 'react';
import { Theme } from '../types';

interface MappingModalProps {
  mapping: Map<string, string>;
  onClose: () => void;
  theme: Theme;
}

const MappingModal: React.FC<MappingModalProps> = ({ mapping, onClose, theme }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const mappingArray = Array.from(mapping.entries());

  const renderCharacter = (char: string) => {
    if (char === ' ') return "' ' (space)";
    if (char === '\n') return "'\\n' (newline)";
    if (char === '\t') return "'\\t' (tab)";
    return `'${char}'`;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${theme.modalBg}`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md max-h-[80vh] rounded-2xl shadow-xl transition-all duration-300 ${theme.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className={`text-xl font-bold ${theme.title}`}>Character to Emoji Mapping</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">&times;</button>
        </div>
        <div className="overflow-y-auto p-6 max-h-[calc(80vh-120px)]">
          <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-sm">
            {mappingArray.map(([char, emoji]) => (
              <div key={char} className="flex items-center space-x-2">
                <span className="font-mono text-gray-400">{renderCharacter(char)}</span>
                <span className="text-gray-500">→</span>
                <span className="text-xl">{emoji}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-700 text-right">
           <button onClick={onClose} className={`px-4 py-2 rounded-lg font-semibold text-center transition-all duration-300 ${theme.secondaryButton}`}>
              Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default MappingModal;
