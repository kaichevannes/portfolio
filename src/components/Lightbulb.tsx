import { styled } from '@linaria/react';
import React from 'react';

import { useTheme } from '@/components/ThemeProvider';

import LightBulbOuter from '@/svg/lightbulb.svg';
import LightBulbInner from '@/svg/lightbulb-inner.svg';

const LightBulb = () => {
  const { theme, } = useTheme();
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Wrapper>
      <LightBulbCord />
      <LightBulbWrapper>
        <LightBulbInnerWrapper
          style={{ color: theme === 'light' ? 'var(--color-highlight)' : 'transparent' }}
          className={animate ? 'animate' : undefined}
        >
          <LightBulbInner width={24} height={24} />
        </LightBulbInnerWrapper>
        <LightBulbOuter width={36} height={36} />
      </LightBulbWrapper>
    </Wrapper >
  )
}

const Wrapper = styled.div`
  margin-bottom: -67px;
`;

const LightBulbCord = styled.div`
  position: absolute;
  top: -60px;
  left: 17px;
  width: 2px;
  height: 67px;
  background: var(--color-text);
`;

const LightBulbWrapper = styled.div`
  top: -64px;
  position: relative;
  color: var(--color-text);
`;

const LightBulbInnerWrapper = styled.div`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  &.animate {
    animation: fadeIn 600ms ease-out;
  }

  position: absolute;
  top: 12px;
  left: 6px;
  margin-bottom: -24px;
`;

export { LightBulb }
