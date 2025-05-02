import { styled } from '@linaria/react';

import { WEIGHTS, QUERIES } from '@/constants';

import NextJS from '@/svg/nextjs.svg';
import Linaria from '@/svg/linaria.svg';
import RadixUI from '@/svg/radixui.svg';
import LinkedIn from '@/svg/linkedin.svg';
import GitHub from '@/svg/github.svg';

const Footer = () => {
  return (
    <Wrapper>
      <IconGroup>
        <IconLink href='https://nextjs.org/'>
          <NextJS width={28} height={28} />
          Next.JS
        </IconLink>
        <IconLink href='https://linaria.dev/'>
          <Linaria width={28} height={28} />
          Linaria
        </IconLink>
        <IconLink href='https://www.radix-ui.com/primitives'>
          {/* Optical Alignment with vertical icon. */}
          <RadixUI width={28} height={28} style={{ marginLeft: '-4px', marginRight: '-4px' }} />
          Radix Primitives
        </IconLink>
      </IconGroup>
      <IconGroup>
        <IconLink href='https://www.linkedin.com/in/kaichevannes/'>
          <LinkedIn width={28} height={28} />
          LinkedIn
        </IconLink>
        <IconLink href='https://github.com/kaichevannes'>
          <GitHub width={28} height={28} />
          GitHub
        </IconLink>
      </IconGroup>
    </Wrapper>
  )
};

const Wrapper = styled.footer`
  margin-top: 128px;
  padding-bottom: 32px;
  width: 100%;
  border-top: 1px solid var(--color-grey300);
  display: flex;
  justify-content: space-between;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.regular};
  color: var(--color-grey300);

  @media ${QUERIES.tabletAndDown} {
    padding-bottom: 16px;
  }
`;

const IconGroup = styled.div`
  padding-top: 16px;
  display: flex;
  gap: 16px;
`;

const IconLink = styled.a`
  display: flex;
  gap: 8px;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: var(--color-grey700);
  }
`;

export { Footer }
