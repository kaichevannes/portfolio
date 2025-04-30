import { styled } from '@linaria/react';
import { ReactNode } from 'react';

const Hint = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      {children}
      <HintSignifier>?</HintSignifier>
    </Wrapper>
  )
}

const Wrapper = styled.span`
  cursor: help;
`;

const HintSignifier = styled.sup`
  color: var(--color-primary);
`;

export { Hint };
