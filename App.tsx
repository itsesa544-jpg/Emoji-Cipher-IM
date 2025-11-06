import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { THEMES, CHAR_MAP, EMOJI_MAP } from './constants';
import { Theme } from './types';
import ThemeSwitcher from './components/ThemeSwitcher';
import Card from './components/Card';
import Button from './components/Button';
import MappingModal from './components/MappingModal';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [passphrase, setPassphrase] = useState('');
  const [plainText, setPlainText] = useState('i love you');
  const [encodedText, setEncodedText] = useState('');
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

  const handleEncode = () => {
    const encoded = plainText
      .toLowerCase()
      .split('')
      .map(char => CHAR_MAP[char] || char)
      .join('');
    setEncodedText(encoded);
  };

  const handleDecode = () => {
    const decoded = encodedText
      .split('')
      .map(emoji => EMOJI_MAP[emoji] || emoji)
      .join('');
    setPlainText(decoded);
  };

  const handleTranslate = async () => {
    if (!plainText) return;
    setIsTranslating(true);
    try {
      // This is a demo, so we'll simulate the API call.
      // In a real app, you would use the Gemini API like this:
      // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // const response = await ai.models.generateContent({
      //   model: 'gemini-2.5-flash',
      //   contents: `Translate the following text to Bengali: "${plainText}"`,
      // });
      // setPlainText(response.text);
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setPlainText("আমি তোমায় ভালোবাসি");

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
  
  const handlePaste = async (setter: React.Dispatch<React.SetStateAction<string>>) => {
    try {
      const text = await navigator.clipboard.readText();
      setter(text);
    } catch (err) {
      console.error('Failed to paste text: ', err);
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
            className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-base focus:ring-2 focus:outline-none"
            style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)', 'caretColor': 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
          />
          <Button onClick={() => setIsModalOpen(true)} variant="secondary" className="w-full mt-4">Show Mapping</Button>
        </Card>

        <Card>
          <label htmlFor="plain-text" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary-color)' }}>Plain Text (লিখা)</label>
          <textarea
            id="plain-text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            rows={4}
            className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-base focus:ring-2 focus:outline-none"
            style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)', 'caretColor': 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
          />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button onClick={handleEncode} variant="primary">Encode ↓</Button>
            <Button onClick={handleTranslate} variant="primary" disabled={isTranslating}>
              {isTranslating ? 'Translating...' : 'Translate to বাংলা'}
            </Button>
            <Button onClick={() => handlePaste(setPlainText)} variant="secondary">Paste</Button>
            <Button onClick={() => setPlainText('')} variant="secondary">Clear</Button>
          </div>
        </Card>

        <Card>
          <label htmlFor="encoded-text" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary-color)' }}>Encoded Emoji (ইমোজি)</label>
          <textarea
            id="encoded-text"
            value={encodedText}
            onChange={(e) => setEncodedText(e.target.value)}
            placeholder="Encoded emoji appears here..."
            rows={4}
            className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-base focus:ring-2 focus:outline-none"
            style={{ borderColor: 'var(--secondary-color)', color: 'var(--text-color)', 'caretColor': 'var(--primary-color)', '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
          />
           <div className="grid grid-cols-2 gap-3 mt-4">
            <Button onClick={handleDecode} variant="primary">Decode ↑</Button>
            <Button onClick={() => handleCopy(encodedText)} variant="secondary">Copy</Button>
            <Button onClick={() => handlePaste(setEncodedText)} variant="secondary">Paste</Button>
            <Button onClick={() => setEncodedText('')} variant="secondary">Clear</Button>
          </div>
        </Card>
      </main>
      
      <MappingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
