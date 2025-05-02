import { styled } from '@linaria/react';
import { ReactNode } from 'react';

import { WEIGHTS } from '@/constants';

const Heading = ({ children }: { children: ReactNode }) => {
  return <Title>{children}<Accent>.</Accent></Title>
};

const Title = styled.h2`
  font-weight: ${WEIGHTS.bold};
  font-size: ${48 / 16}rem;
  letter-spacing: -2%;
  padding-bottom: 16px;
`;

const Accent = styled.span`
  color: var(--color-primary);
`;

export { Heading };
