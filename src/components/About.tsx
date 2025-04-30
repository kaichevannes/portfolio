import { styled } from '@linaria/react';

import { WEIGHTS } from '@/constants';

import { Heading } from '@/components/Heading';
import { Hint } from '@/components/Hint';
import { Anchor } from '@/components/Anchor';

const About = () => {
  return (
    <Wrapper id='about'>
      <Heading>About</Heading>
      <Contents>
        <P>
          I care about cultures built on curiosity and kindness, spaces for continuous learning and warmth.
        </P>
        <P>
          I’m eager to ask questions and improve my skills, to grow as both a person and a developer. I want to wake up excited for the day and to learn from thoughtful people.
        </P>
        <P>
          I studied Computer Science at the University of Southampton and graduated with First Class Honours. Right now, I’m focused on building an intuition for industry best practices by reading the <Anchor href="https://www.goodreads.com/review/list/168867354?shelf=software&sort=rating">most influential books in the field.</Anchor>
        </P>
        <P>
          When I’m not listening to <Anchor href="https://www.goodreads.com/review/list/168867354-kai-chevannes?order=d&shelf=read&sort=rating">audiobooks</Anchor> or tinkering with my <Hint>dev environment</Hint>, I enjoy <Anchor href="https://rateyourmusic.com/~cheva">rating obscure music albums</Anchor> and making <Anchor href="https://www.youtube.com/playlist?list=PLWJ3-Ib---3Exq8Lb829sOBjEvbJsAX3S">DJ mixes</Anchor> with songs that mean everything to me.
        </P>
      </Contents>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  font-weight: ${WEIGHTS.medium};
  font-size: ${20 / 16}rem;
`;

const Contents = styled.div`
  color: var(--color-grey900);
`;

const P = styled.p`
  &:not(:last-of-type) {
    padding-bottom: 24px;
  }
`;

export { About };
