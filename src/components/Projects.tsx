import { styled } from '@linaria/react';
import Image from 'next/image';
import Link from 'next/link';

import { WEIGHTS, QUERIES } from '@/constants';

import { Heading } from '@/components/Heading';

const Projects = () => {
  return (
    <Wrapper id='projects'>
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
          <ButtonLink href='/gitops'>
            Read More
            <Hover>Read More</Hover>
          </ButtonLink>
        </Details>
      </Project>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  scroll-margin-top: 72px;
`;

const Project = styled.div`
  padding-top: 12px;
  display: flex;
  gap: 16px;
  align-items: center;

  @media ${QUERIES.tabletAndDown} {
    flex-direction: column-reverse;
  };
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 490 / 376;
  max-height: 392px;
  border: 2px solid var(--color-grey700);
  border-radius: 16px;

  @media ${QUERIES.tabletAndDown} {
    margin-top: 16px;
    max-height: revert;
    width: 85%
  }

  @media ${QUERIES.mobileAndDown} {
    margin-top: 8px;
    width: 100%
  }
`;

const Details = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
  flex-direction: column;
  border-top: 2px solid var(--color-grey700);

  @media ${QUERIES.tabletAndDown} {
    width: 100%;
  }
`;

const Name = styled.h3`
  padding-top: 32px;
  font-size: ${32 / 16}rem;
  font-weight: ${WEIGHTS.semibold};
  color: var(--color-grey900);

  @media ${QUERIES.tabletAndDown} {
    padding-top: 16px;
  }

  @media ${QUERIES.mobileAndDown} {
    padding-top: 8px;
  }
`;

const Description = styled.p`
  padding-bottom: 8px;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey500);
`;

const ButtonLink = styled(Link)`
  position: relative;
  text-decoration: none;
  background: var(--color-text);
  color: var(--color-background);
  border: none;
  width: fit-content;
  padding: 4px 16px;
  border-radius: 4px;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};

  @media ${QUERIES.tabletAndDown} {
    text-align: center;
    width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const Hover = styled.div`
  position: absolute;
  inset: 0;
  background: var(--color-primary);
  transition: clip-path 500ms;
  clip-path: polygon(
    0% 100%,
    0% 100%,
    100% 100%,
    100% 100%
  );
  border-radius: inherit;
  padding: inherit;
  font-size: inherit;
  
  ${ButtonLink}:hover &,
  ${ButtonLink}:focus & {
    transition: clip-path 300ms;
    clip-path: polygon(
      -1% 101%,
      -1% -1%,
      101% -1%,
      101% 101%
    );
  }
`;

export { Projects };
