import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './styles.linaria.global';

import { type Theme, ThemeProvider } from '@/components/ThemeProvider';
import { type ColorType, COLORS } from '@/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Kai Chevannes",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This will only suppress hydration warnings for direct children.
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script dangerouslySetInnerHTML={{ __html: `(${boundSetColorsForTheme})()` }} />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

function setColorsForTheme() {
  let theme: Theme;

  const persistedTheme = localStorage.getItem('theme');

  if (persistedTheme === 'light' || persistedTheme === 'dark') {
    theme = persistedTheme;
  }
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  }
  else {
    theme = 'light';
  }

  // Hacking typescript, this is replaced at runtime below.
  const colors: ColorType = '{{ COLORS_PLACEHOLDER }}' as unknown as ColorType;

  let root = document.documentElement;

  root.style.setProperty('--initial-theme', theme);

  Object.entries(colors).forEach(([colorName, lightDarkValues]) => {
    root.style.setProperty(`--color-${colorName}`, lightDarkValues[theme]);
  });
}

const boundSetColorsForTheme = String(setColorsForTheme)
  // We need the second pair of quotes to match '{{ COLORS_PLACEHOLDER }}' 
  // rather than {{ COLORS_PLACEHOLDER }}. This means that the single quotes
  // are included and replaced with the stringified value.
  .replace("'{{ COLORS_PLACEHOLDER }}'", JSON.stringify(COLORS))
