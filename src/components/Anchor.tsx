import { styled } from '@linaria/react';

import { WEIGHTS } from '@/constants';

const Anchor = styled.a`
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1.5px 0 var(--color-primary);
  font-weight: ${WEIGHTS.semibold};
  transition: box-shadow 0.2s, filter 0.3s;
  box-decoration-break: clone;
  outline-color: var(--color-primary);

  &:hover {
    box-shadow: 0 1.5px 0 transparent;
  }
`;

export { Anchor };
