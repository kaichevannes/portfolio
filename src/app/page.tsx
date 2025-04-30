'use client';

import { styled } from '@linaria/react';

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';

export default function App() {
  return (
    <MaxWidthWrapper>
      <Header />
      <main>
        <Hero />
      </main>
    </MaxWidthWrapper>
  );
}
