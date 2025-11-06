
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Translation feature will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following text to ${targetLanguage}. Do not add any extra explanations or introductory phrases, just return the translated text itself.\n\nText: "${text}"`,
    });
    
    return response.text.trim();

  } catch (error) {
    console.error(`Error calling Gemini API:`, error);
    throw new Error('Failed to translate text.');
  }
};
