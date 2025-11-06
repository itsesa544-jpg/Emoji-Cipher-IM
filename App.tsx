
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeName, Theme } from './types';
import { THEMES } from './constants';
import { generateMapping, encode, decode } from './services/cipherService';
import { translateText } from './services/geminiService';
import ThemeSwitcher from './components/ThemeSwitcher';
import Card from './components/Card';
import Button from './components/Button';
import MappingModal from './components/MappingModal';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeName>('purple');
  const [passphrase, setPassphrase] = useState<string>('');
  const [plainText, setPlainText] = useState<string>('');
  const [encodedText, setEncodedText] = useState<string>('');
  const [isMappingVisible, setIsMappingVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const activeTheme: Theme = THEMES[theme];

  const { mapping, inverseMapping } = useMemo(() => generateMapping(passphrase), [passphrase]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleEncode = useCallback(() => {
    if (!plainText) {
      showNotification('Plain text is empty.');
      return;
    }
    const encoded = encode(plainText, mapping);
    setEncodedText(encoded);
  }, [plainText, mapping]);

  const handleDecode = useCallback(() => {
    if (!encodedText) {
      showNotification('Encoded emoji is empty.');
      return;
    }
    try {
      const decoded = decode(encodedText, inverseMapping);
      setPlainText(decoded);
    } catch (error) {
      showNotification('Invalid emoji sequence for this passphrase.');
    }
  }, [encodedText, inverseMapping]);

  const handleTranslate = useCallback(async () => {
    if (!plainText) {
      showNotification('Plain text is empty.');
      return;
    }
    setIsLoading(true);
    try {
      const translated = await translateText(plainText, 'Bengali');
      setPlainText(translated);
    } catch (error) {
      console.error('Translation error:', error);
      showNotification('Failed to translate text.');
    } finally {
      setIsLoading(false);
    }
  }, [plainText]);

  const handleAction = async (action: 'copy' | 'paste' | 'clear', target: 'plain' | 'encoded') => {
    if (action === 'copy') {
      const textToCopy = target === 'plain' ? plainText : encodedText;
      if (!textToCopy) {
        showNotification('Nothing to copy.');
        return;
      }
      await navigator.clipboard.writeText(textToCopy);
      showNotification('Copied to clipboard!');
    } else if (action === 'paste') {
      const text = await navigator.clipboard.readText();
      if (target === 'plain') setPlainText(text);
      else setEncodedText(text);
      showNotification('Pasted from clipboard!');
    } else if (action === 'clear') {
      if (target === 'plain') setPlainText('');
      else setEncodedText('');
    }
  };


  return (
    <div className={`min-h-screen w-full ${activeTheme.bg} ${activeTheme.text} transition-colors duration-500`}>
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold ${activeTheme.title}`}>Emoji Cipher</h1>
          <p className="text-lg md:text-xl mt-2 text-gray-400">গোপন কথা বলো ইমোজির ভাষায়</p>
        </header>

        <ThemeSwitcher currentTheme={theme} setTheme={setTheme} themes={THEMES} />
        
        <div className="space-y-6">
          <Card theme={activeTheme}>
            <label htmlFor="passphrase" className="block text-sm font-medium mb-2">Passphrase (ঐচ্ছিক)</label>
            <input
              id="passphrase"
              type="text"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="এখানে পাসফ্রেজ দিন"
              className={`w-full p-3 rounded-lg border transition-colors ${activeTheme.input}`}
            />
            <Button onClick={() => setIsMappingVisible(true)} className="w-full mt-3">
              Show Mapping
            </Button>
          </Card>

          <Card theme={activeTheme}>
            <label htmlFor="plain-text" className="block text-sm font-medium mb-2">Plain Text (লেখা)</label>
            <textarea
              id="plain-text"
              rows={5}
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              placeholder="Enter your secret message here..."
              className={`w-full p-3 rounded-lg border transition-colors ${activeTheme.input}`}
            />
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Button onClick={handleEncode} variant="primary">Encode ↓</Button>
              <Button onClick={handleTranslate} variant="primary" disabled={isLoading}>
                {isLoading ? 'Translating...' : 'Translate to বাংলা'}
              </Button>
              <Button onClick={() => handleAction('paste', 'plain')}>Paste</Button>
              <Button onClick={() => handleAction('clear', 'plain')}>Clear</Button>
            </div>
          </Card>

          <Card theme={activeTheme}>
            <label htmlFor="encoded-emoji" className="block text-sm font-medium mb-2">Encoded Emoji (ইমোজি)</label>
            <textarea
              id="encoded-emoji"
              rows={5}
              value={encodedText}
              onChange={(e) => setEncodedText(e.target.value)}
              placeholder="Encoded emoji appears here..."
              className={`w-full p-3 rounded-lg border transition-colors ${activeTheme.input}`}
            />
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Button onClick={handleDecode} variant="primary">Decode ↑</Button>
              <Button onClick={() => handleAction('copy', 'encoded')}>Copy</Button>
              <Button onClick={() => handleAction('paste', 'encoded')}>Paste</Button>
              <Button onClick={() => handleAction('clear', 'encoded')}>Clear</Button>
            </div>
          </Card>
        </div>
      </main>

      {isMappingVisible && (
        <MappingModal mapping={mapping} onClose={() => setIsMappingVisible(false)} theme={activeTheme} />
      )}
      
      {notification && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {notification}
        </div>
      )}
      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translate(-50%, 10px); }
          20% { opacity: 1; transform: translate(-50%, 0); }
          80% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 10px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 2s forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
