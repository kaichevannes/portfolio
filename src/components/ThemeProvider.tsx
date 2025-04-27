'use client';

import React, { ReactNode } from 'react';

import { COLORS } from '@/constants';

// From https://www.joshwcomeau.com/react/dark-mode/
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme | undefined;
  setTheme: (value: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, rawSetTheme] = React.useState<Theme>();

  React.useEffect(() => {
    const root = window.document.documentElement;

    const initialTheme = root.style.getPropertyValue('--initial-theme');

    rawSetTheme(initialTheme as Theme);
  }, []);

  const setTheme = (value: Theme) => {
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

export { type Theme, ThemeProvider, useTheme }
