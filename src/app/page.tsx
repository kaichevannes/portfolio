'use client';

import { styled } from '@linaria/react';

import { Header } from '@/components/Header';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { useTheme } from '@/components/ThemeProvider';

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <MaxWidthWrapper>
      <Header />
      <main>
        <Wrapper>
          <p>Hello World</p>
        </Wrapper>
      </main>
    </MaxWidthWrapper>
  );
}

const Wrapper = styled.div`
  color: var(--color-primary);
`;
