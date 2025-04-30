import { styled } from '@linaria/react';

import { WEIGHTS } from '@/constants';

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
          width={475}
          height={376}
          quality={100}
          priority
        />
        <HeroImage
          src='/meditation.png'
          alt='Me sitting in lotus position on my bed in the morning sun.'
          width={475}
          height={376}
          quality={100}
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
`;

const Text = styled.div`
  max-width: 354px;
`;

const Hello = styled.div`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey900);
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
`;

const Accent = styled.span`
  color: var(--color-primary);
`;

const ImageWrapper = styled.div`
  position: relative;
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
