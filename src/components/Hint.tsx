import { styled } from '@linaria/react';
import { Tooltip } from 'radix-ui';
import { ReactNode, CSSProperties } from 'react';

import { COLORS, WEIGHTS } from '@/constants';

import { useTheme } from '@/components/ThemeProvider';

const Hint = ({ children, hintContent }: { children: ReactNode, hintContent: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Wrapper>
          {children}
          <HintSignifier>?</HintSignifier>
        </Wrapper>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Content style={{
          '--color-highlight': theme === 'light' ? COLORS.highlight.dark : COLORS.highlight.light
        } as CSSProperties}>
          {hintContent}
          < Arrow />
        </Content>
      </Tooltip.Portal>
    </Tooltip.Root >
  )
}

Hint.Bold = styled.strong`
  font-weight: ${WEIGHTS.bold};
`;

const Wrapper = styled.span`
  cursor: help;
`;

const HintSignifier = styled.sup`
  line-height: 1;
  color: var(--color-primary);
`;

const Content = styled(Tooltip.Content)`
  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  hyphens: manual;
  text-align: center;
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  max-width: 312px;
  border-radius: 8px;
  padding: 8px 16px;
  background: var(--color-text);
  color: var(--color-background);
  animation: slideDownAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const Arrow = styled(Tooltip.Arrow)`
  fill: var(--color-text);
`;

export { Hint };
