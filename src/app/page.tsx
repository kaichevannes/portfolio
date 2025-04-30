'use client';

import { styled } from '@linaria/react';

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';

export default function App() {
  return (
    <MaxWidthWrapper>
      <Header />
      <main>
        <Hero />
        <About />
      </main>
    </MaxWidthWrapper>
  );
}
