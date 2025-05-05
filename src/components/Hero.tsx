import { styled } from '@linaria/react';

import { WEIGHTS, QUERIES } from '@/constants';

import Image from 'next/image';

const Hero = () => {
  return (
    <Wrapper>
      <Text>
        <Hello>Hi, I'm Kai</Hello>
        <JobRole><Accent>Software</Accent> Developer</JobRole>
        <Description>I’m inspired by excellence — mastery of the small details.</Description>
      </Text>
      <ImageWrapper>
        <BlurImage
          src='/meditation.png'
          alt='Me sitting in lotus position on my bed in the morning sun.'
          quality={25}
          fill
          priority
        />
        <HeroImage
          src='/meditation.png'
          alt='Me sitting in lotus position on my bed in the morning sun.'
          quality={100}
          fill
          priority
        />
      </ImageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 176px;
  padding-bottom: 176px;
  justify-content: space-between;

  @media ${QUERIES.tabletAndDown} {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 64px;
    padding-bottom: 64px;
    gap: 64px;
  }

  @media ${QUERIES.mobileAndDown} {
    padding-top: 48px;
    padding-bottom: 48px;
    gap: 48px;
  }
`;

const Text = styled.div`
  max-width: 360px;

  @media ${QUERIES.tabletAndDown} {
    max-width: revert;
  }
`;

const Hello = styled.div`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey900);
  font-size: ${20 / 16}rem;
`;

const JobRole = styled.div`
  font-weight: ${WEIGHTS.bold};
  line-height: 1.1;
  letter-spacing: -3%;
  font-size: ${72 / 16}rem;
  transform: translateX(-4px);
`;

const Description = styled.div`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey500);
  font-size: ${20 / 16}rem;
`;

const Accent = styled.span`
  color: var(--color-primary);
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 491 / 388;
  width: 491px; 

  @media ${QUERIES.tabletAndDown} {
    align-self: center;
    width: 80%;
  }

  @media ${QUERIES.mobileAndDown} {
    width: 95%;
  }
`;

const HeroImage = styled(Image)`
  position: relative;
  border-radius: 100px;
  object-fit: cover;
`;

const BlurImage = styled(HeroImage)`
  position: absolute;
  filter: blur(40px);
  transform: scale(1.05);
`;

export { Hero };
