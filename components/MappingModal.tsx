import React from 'react';
import { CHAR_MAP } from '../constants';
import Card from './Card';

interface MappingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MappingModal: React.FC<MappingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Character to Emoji Mapping</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 max-h-96 overflow-y-auto pr-2">
          {Object.entries(CHAR_MAP).map(([char, emoji]) => (
            <div key={char} className="text-center p-2 rounded" style={{backgroundColor: 'var(--secondary-color)'}}>
              <div className="font-mono text-lg">{char === ' ' ? '" "' : char}</div>
              <div className="text-2xl">{emoji}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MappingModal;
