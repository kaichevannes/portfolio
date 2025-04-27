'use client';

import React, { ReactNode } from 'react';

import { COLORS } from '@/constants';

// From https://www.joshwcomeau.com/react/dark-mode/
interface ThemeContextType {
  theme: string | undefined;
  setTheme: (value: 'light' | 'dark') => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, rawSetTheme] = React.useState<string>();

  React.useEffect(() => {
    const root = window.document.documentElement;

    const initialTheme = root.style.getPropertyValue('--initial-theme');

    rawSetTheme(initialTheme);
  }, []);

  const setTheme = (value: 'light' | 'dark') => {
    const root = window.document.documentElement;

    window.localStorage.setItem('theme', value);

    Object.entries(COLORS).forEach(([colorName, lightDarkValues]) => {
      root.style.setProperty(`--color-${colorName}`, lightDarkValues[value]);
    });

    rawSetTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme }
