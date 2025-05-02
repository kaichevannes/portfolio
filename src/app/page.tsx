'use client';

import { styled } from '@linaria/react';

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function App() {
  return (
    <MaxWidthWrapper>
      <Header />
      <main>
        <Hero />
        <Sections>
          <About />
          <Projects />
          <Contact />
        </Sections>
      </main>
      <Footer />
    </MaxWidthWrapper>
  );
}

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;
