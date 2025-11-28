import React, { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

type Language = 'mr' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  const t = (key: string): string => {
    const keys = key.split('.');
<<<<<<< HEAD
    let value: unknown = translations[language];

    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return (typeof value === 'string' ? value : key) || key;
=======
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
