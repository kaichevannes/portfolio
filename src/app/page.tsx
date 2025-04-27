'use client';

import { styled } from '@linaria/react';

import { useTheme } from 'next-themes';

import { Header } from '@/components/Header';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';

export default function App() {
  const { theme, setTheme } = useTheme()

  return (
    <MaxWidthWrapper>
      <Header />
      <main>
        <Wrapper>
          <p>Hello World</p>
        </Wrapper>
        <div>
          The current theme is: {theme}
          <button onClick={() => setTheme('light')}>Light Mode</button>
          <button onClick={() => setTheme('dark')}>Dark Mode</button>
        </div>
      </main>
    </MaxWidthWrapper>
  );
}

const Wrapper = styled.div`
  color: var(--color-primary);
`;
