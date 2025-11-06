
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { THEMES } from './constants';
import { Theme } from './types';
import { generateCipherMaps } from './services/cipherService';
import ThemeSwitcher from './components/ThemeSwitcher';
import Card from './components/Card';
import Button from './components/Button';
import MappingModal from './components/MappingModal';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [passphrase, setPassphrase] = useState('');

  const cipherMaps = useMemo(() => generateCipherMaps(passphrase), [passphrase]);

  const encodeText = useCallback((text: string) => {
    return text
      .split('')
      .map(char => cipherMaps.charMap[char] || char)
      .join('');
  }, [cipherMaps]);

  const decodeText = useCallback((text: string) => {
    return text
      .split('')
      .map(emoji => cipherMaps.emojiMap[emoji] || emoji)
      .join('');
  }, [cipherMaps]);

  const initialPlainText = 'i love you';
  const [plainText, setPlainText] = useState(initialPlainText);
  const [encodedText, setEncodedText] = useState(() => encodeText(initialPlainText));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', theme.colors.bg);
    root.style.setProperty('--card-bg-color', theme.colors.cardBg);
    root.style.setProperty('--text-color', theme.colors.text);
    root.style.setProperty('--text-secondary-color', theme.colors.textSecondary);
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--primary-hover-color', theme.colors.primaryHover);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--secondary-hover-color', theme.colors.secondaryHover);
  }, [theme]);

  const handlePlainTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlainText(e.target.value);
  };
  
  const handleEncodedTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEncodedText(e.target.value);
  };

  const handleEncode = () => {
    setEncodedText(encodeText(plainText));
  };
  
  const handleDecode = () => {
    setPlainText(decodeText(encodedText));
  };

  const handleTranslate = async () => {
    if (!plainText) return;
    setIsTranslating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Translate the following text to Bengali: "${plainText}"`,
      });
      const translated = response.text;
      
      setPlainText(translated);

    } catch (error) {
      console.error("Translation failed:", error);
      // Handle error display to the user
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optionally, show a success message
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const handlePasteToPlainText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPlainText(text);
    } catch (err) {
      console.error('Failed to paste text: ', err);
    }
  };

  const handlePasteToEncoded = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setEncodedText(text);
    } catch (err) {
      console.error('Failed to paste text: ', err);
    }
  };

  const clearPlainText = () => {
    setPlainText('');
  };

  const clearEncodedText = () => {
    setEncodedText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const { selectionStart, selectionEnd, value, id } = e.currentTarget;

      const newValue =
        value.substring(0, selectionStart) +
        '\t' +
        value.substring(selectionEnd);

      if (id === 'plain-text') {
        setPlainText(newValue);
      } else if (id === 'encoded-text') {
        setEncodedText(newValue);
      }
      
      requestAnimationFrame(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = selectionStart + 1;
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--text-color)' }}>Emoji Cipher</h1>
        <p className="text-lg mt-2" style={{ color: 'var(--text-secondary-color)' }}>গোপন কথা বলো ইমোজির ভাষায়</p>
      </header>
      
      <ThemeSwitcher themes={THEMES} activeTheme={theme} setTheme={setTheme} />

      <main className="w-full max-w-2xl mx-auto space-y-6 mt-8">
        <Card>
          <label htmlFor="passphrase" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary-color)' }}>Passphrase (ঐচ্ছিক)</label>
          <input
            id="passphrase"
            type="text"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="এখানে পাসফ্রেজ দিন"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-base focus:ring-2 focus:outline-none"
            style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)', 'caretColor': 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
          />
          <Button onClick={() => setIsModalOpen(true)} variant="secondary" className="w-full mt-4">Show Mapping</Button>
        </Card>

        <Card>
          <label htmlFor="plain-text" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary-color)' }}>Plain Text (লিখা)</label>
          <textarea
            id="plain-text"
            value={plainText}
            onChange={handlePlainTextChange}
            onKeyDown={handleKeyDown}
            rows={4}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-base focus:ring-2 focus:outline-none"
            style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)', 'caretColor': 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
          />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button onClick={handleEncode} variant="primary">Encode ↓</Button>
            <Button onClick={handleTranslate} variant="primary" disabled={isTranslating}>
              {isTranslating ? 'Translating...' : 'Translate to বাংলা'}
            </Button>
            <Button onClick={handlePasteToPlainText} variant="secondary">Paste</Button>
            <Button onClick={clearPlainText} variant="secondary">Clear</Button>
          </div>
        </Card>

        <Card>
          <label htmlFor="encoded-text" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary-color)' }}>Encoded Emoji (ইমোজি)</label>
          <textarea
            id="encoded-text"
            value={encodedText}
            onChange={handleEncodedTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Encoded emoji appears here..."
            rows={4}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-base focus:ring-2 focus:outline-none"
            style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)', 'caretColor': 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
          />
           <div className="grid grid-cols-2 gap-3 mt-4">
            <Button onClick={handleDecode} variant="primary">Decode ↑</Button>
            <Button onClick={() => handleCopy(encodedText)} variant="secondary">Copy</Button>
            <Button onClick={handlePasteToEncoded} variant="secondary">Paste</Button>
            <Button onClick={clearEncodedText} variant="secondary">Clear</Button>
          </div>
        </Card>
      </main>
      
      <MappingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} charMap={cipherMaps.charMap} />
    </div>
  );
};

export default App;