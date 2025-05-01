import { styled } from '@linaria/react';
import Image from 'next/image';
import Link from 'next/link';

import { WEIGHTS } from '@/constants';

import { Heading } from '@/components/Heading';

const Projects = () => {
  return (
    <div id='projects'>
      <Heading>Projects</Heading>
      <Project>
        <ImageWrapper>
          {/* The sizes below should be 50vw for desktop, at the moment for mobile. */}
          <Image
            src='/gitops.png'
            alt='A drawn digital image of Moby the Docker whale with the Kubernetes ship wheel logo on the front.'
            fill
            quality={100}
          />
        </ImageWrapper>
        <Details>
          <Name>GitOps</Name>
          <Description>Kubernetes with no manual steps. How I self-host this portfolio for free.</Description>
          <ButtonLink href='/gitops'>Read More</ButtonLink>
        </Details>
      </Project>
    </div>
  );
};

const Project = styled.div`
  padding-top: 12px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 490 / 376;
  max-height: 392px;
  border: 2px solid var(--color-grey700);
  border-radius: 16px;
`;

const Details = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
  flex-direction: column;
  border-top: 2px solid var(--color-grey700);
`;

const Name = styled.h3`
  padding-top: 32px;
  font-size: ${32 / 16}rem;
  font-weight: ${WEIGHTS.semibold};
  color: var(--color-grey900);
`;

const Description = styled.p`
  padding-bottom: 8px;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey500);
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  background: var(--color-text);
  color: var(--color-background);
  border: none;
  width: fit-content;
  padding: 4px 16px;
  border-radius: 4px;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};

  &:hover {
    background: var(--color-primary);
  }
`;

export { Projects };
