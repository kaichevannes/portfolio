import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import './styles.linaria.global';

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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
