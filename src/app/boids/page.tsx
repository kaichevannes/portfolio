
'use client';

import { styled } from '@linaria/react';
import React from 'react';
import Link from 'next/link';

import { WEIGHTS, COLORS, QUERIES } from '@/constants';

import Rust from '@/svg/rust.svg';
import WebAssembly from '@/svg/webassembly.svg';
import Vite from '@/svg/vite.svg';
import CSSModules from '@/svg/cssmodules.svg';

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hint } from '@/components/Hint';
import { Anchor } from '@/components/Anchor';
import { Section } from '@/components/Section';
import Simulation from './simulation';

export default function GitOps() {
    return (
        <MaxWidthWrapper>
            <Header />
            <Main>
                <PageTitle>
                    <div style={{ order: 1 }}>
                        <Title>Web Boids</Title>
                        <Description>I ported my dissertation to multi-threaded WASM, it's blazingly fast.</Description>
                    </div>
                    <div>
                        <H3>Key Technologies</H3>
                        <Tech>
                            <TechEntry>
                                <Rust height='56px' />
                                <TechText>Rust</TechText>
                            </TechEntry>
                            <TechEntry>
                                <WebAssembly height='56px' />
                                <TechText>Web Assembly</TechText>
                            </TechEntry>
                            <TechEntry>
                                <Vite height='56px' />
                                <TechText>Vite</TechText>
                            </TechEntry>
                            <TechEntry>
                                <CSSModules height='56px' />
                                <TechText>Css Modules</TechText>
                            </TechEntry>
                        </Tech>
                    </div>
                </PageTitle>
                <Simulation />
                <Section title='Summary'>
                    <Section.Contents>
                        <p>
                            I implemented an optimised version of the Boids algorithm in Rust, improving performance further with multi-threading. This compiles to Web Assembly using service workers on the browser rather than operating system threads in Rust.
                        </p>
                    </Section.Contents>
                </Section>
                <Section title='Purpose & Goal'>
                    <Section.Contents>
                        I wasn't satisfied with the performance level of the Boids implementation I did for my University disseration. It worked, but it was slow - only running smoothly up to about 100 boids. It was written in python, didn't use any algorithmic optimisations, and wasn't multi-threaded. Further, since learning React I've been interested in using Vite and writing library code. My acceptance criteria were:
                        <ol>
                            <Li><Bold>Implement</Bold> an improved Boids algorithm in Rust using TDD</Li>
                            <Li><Bold>Get</Bold> multi-threading working natively and on the web</Li>
                            <Li><Bold>Experiment</Bold> with Vite library mode</Li>
                            <Li><Bold>Publish</Bold> my code to npm</Li>
                        </ol>
                        <p>
                            This was all new to me so I started by reading <Anchor href='https://doc.rust-lang.org/book/'>The Rust Programming Language</Anchor> and completing ThePrimeagen's <Anchor href='https://static.frontendmasters.com/ud/c/eddf8c40d0/aPVwjxMZsP/algorithms.pdf'>Algorithms course</Anchor>.
                        </p>
                    </Section.Contents>
                </Section>
                <Section title='Spotlight'>
                    <Section.Contents>
                    </Section.Contents>
                </Section>
                <Section title='Challenges'>
                    <Section.Contents>
                        <p>
                            This was far and away the most ambitious project I have ever attempted. WebAssembly is notoriously challenging to set up, and I decided to not only try to use multi-threaded WASM - requiring me to use a nightly build of <i>Rust</i> to even compile my project - but also build it in a Vite library using RollUp, then import it as a package into a NextJS project that uses WebPack, with next to no documentation to follow because nobody else is mad enough to try to import multi-threaded WASM into a NextJS application!
                        </p>
                        <p>

                        </p>
                    </Section.Contents>
                </Section>
                <Section title='Lessons Learned'>
                    <Section.Contents>

                    </Section.Contents>
                </Section>
                <nav>
                    <PageLink href='/gitops'>{"<- GitOps"}</PageLink>
                </nav>
            </Main>
            <Footer />
        </MaxWidthWrapper >
    )
};

const Main = styled.div`
  padding-top: 96px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${QUERIES.tabletAndDown} {
    padding-top: 32px;
  }
`;

const PageTitle = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 24px 32px;

  @media ${QUERIES.tabletAndDown} {
    display: flex;
    flex-direction: column-reverse;
    gap: revert;
  }
`;

const H3 = styled.h3`
  color: var(--color-grey900);
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};

  @media ${QUERIES.tabletAndDown} {
    font-size: ${24 / 16}rem;
  }
`;

const Tech = styled.div`
  display: flex;
  justify-content: space-between;
  height: 128px;
  padding-top: 8px;

  @media ${QUERIES.tabletAndDown} {
    justify-content: flex-start;
    gap: 48px;
  }

  @media ${QUERIES.mobileAndDown} {
    justify-content: space-between;
    gap: revert;
  }
`;

const TechEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text);
`;

const TechText = styled.p`
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.regular};
  color: var(--color-grey500);
  white-space: nowrap;
`;

const Title = styled.h1`
  font-size: ${48 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-text);
  transform: translateY(-11px);
`;

const Description = styled.p`
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey500);
  transform: translateY(-12px);
`;

const VideoWrapper = styled.div`
  margin-top: -18px;
  position: relative;
`;

const LightVideoWrapper = styled(VideoWrapper)`
  padding: 24px;
  box-shadow:
    inset
    1px 2px 4px
    hsl(var(--color-shadow) / 0.3);
  border-radius: 1px;

  & video {
    box-shadow:
      2px 2px 4px
      hsl(var(--color-shadow) / 0.3);
  }

  @media ${QUERIES.tabletAndDown} {
    padding: 16px;
    margin-top: -36px;
  }
`;

const DarkVideoWrapper = styled(VideoWrapper)`
  // to prevent anti-aliasing bug
  will-change: transform;
  border-radius: 8px;
  box-shadow: var(--shadow);
`;

const Video = styled.video`
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

const PlayPauseWrapper = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 64px;
  height: 64px;
  opacity: 0;
  transition: opacity 250ms;
  color: ${COLORS.background['light']};

  ${VideoWrapper}:hover & {
    opacity: 1;
    transition: opacity 200ms;
  }
`;

const Bold = styled.strong`
  font-weight: ${WEIGHTS.semibold};
  color: var(--color-grey700);
`;

const Li = styled.li`
  &::marker {
    color: var(--color-primary);
  }
`;

const Caption = styled.figcaption`
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.regular};
  color: var(--color-grey300);
  text-align: center;
`;

const PageLink = styled(Link)`
  float: left;
  text-decoration: none;
  margin-top: 72px;
  color: var(--color-text);
  font-size: ${40 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  letter-spacing: -2%;
  text-wrap: nowrap;

  @media ${QUERIES.tabletAndDown} {
    margin-top: 48px;
  }

  @media ${QUERIES.mobileAndDown} {
    margin-top: 32px;
  }

  transition: transform 300ms;
  &:hover,
  &:focus {
    transition: transform 150ms;
    transform: scale(1.01);
  }
`;
