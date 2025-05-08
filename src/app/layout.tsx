import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './styles.linaria.global';

import { type Theme, ThemeProvider } from '@/components/ThemeProvider';
import { SoundOnProvider } from '@/components/SoundOnProvider';
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
      <head>
        <style>{FallbackStyles()}</style>
      </head>
      <body className={inter.className}>
        <script dangerouslySetInnerHTML={{ __html: `(${boundSetColorsForTheme})()` }} />
        <ThemeProvider>
          <SoundOnProvider>
            {children}
          </SoundOnProvider>
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
  // Leave double quotes "". When this gets minified it minifies to double
  // quotes which we need to match in order to replace it below.
  const colors: ColorType = "{{ COLORS_PLACEHOLDER }}" as unknown as ColorType;

  let root = document.documentElement;

  root.style.setProperty('--initial-theme', theme);

  Object.entries(colors).forEach(([colorName, lightDarkValues]) => {
    root.style.setProperty(`--color-${colorName}`, lightDarkValues[theme]);
  });
}

const boundSetColorsForTheme = String(setColorsForTheme)
  // We need the second pair of quotes to match "{{ COLORS_PLACEHOLDER }}" 
  // rather than {{ COLORS_PLACEHOLDER }}. This means that the double quotes
  // are included and replaced with the stringified value.
  .replace('"{{ COLORS_PLACEHOLDER }}"', JSON.stringify(COLORS))

// Default styles when JS is disabled.
// https://github.com/joshwcomeau/dark-mode-minimal/blob/5d4d5612667d06f9350f4ba3eea187df8a8231ff/gatsby-ssr.js#L64-L81
const FallbackStyles = () => {
  const cssVariableString = Object.entries(COLORS).reduce(
    (acc, [name, colorByTheme]) => {
      return `${acc}\n--color-${name}: ${colorByTheme.light};`;
    },
    ''
  );

  return `html { ${cssVariableString} }`;
}
