import { styled } from '@linaria/react';

import { WEIGHTS } from '@/constants';
import { useTheme } from '@/components/ThemeProvider';

import Volume2 from '@/svg/volume-2.svg';
import Sun from '@/svg/sun.svg';
import Moon from '@/svg/moon.svg';

const Header = () => {
  const { theme, setTheme } = useTheme();

  // While we wait for the theme to resolve client side, show a blank div with
  // the same size as the theme icon to preserve layout.
  let ThemeIcon;
  switch (theme) {
    case 'light':
      ThemeIcon = Sun;
      break;
    case 'dark':
      ThemeIcon = Moon;
      break;
    default:
      ThemeIcon = PlaceholderIcon;
  }

  return (
    <Wrapper>
      <Logo href='#'>kai chevannes<Accent>.</Accent></Logo>
      <Nav>
        <NavLink href='#about'>about</NavLink>
        <NavLink href='#projects'>projects</NavLink>
        <NavLink href='#contact'>contact</NavLink>
      </Nav>
      <Buttons>
        <Button>
          <IconWrapper>
            <Volume2 />
          </IconWrapper>
          sound
        </Button>
        <Button onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>
          <IconWrapper>
            <ThemeIcon />
          </IconWrapper>
          light
        </Button>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Logo = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: ${32 / 16}rem;
  font-weight: ${WEIGHTS.bold};
`;

const Accent = styled.span`
  color: var(--color-primary);
`;

const Nav = styled.nav`
  color: var(--color-grey900);
  display: flex;
  gap: 48px;
`;

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: ${WEIGHTS.semibold};
  font-size: ${20 / 16}rem;
`;

const Buttons = styled.div`
  color: var(--color-grey900);
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
  padding: 0;

  display: flex;
  align-items: baseline;
  gap: 8px;
  font-weight: ${WEIGHTS.semibold};
  font-size: ${20 / 16}rem;

  &:focus {
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  align-self: center;
`;

const PlaceholderIcon = styled.div`
  width: 24px;
  height: 24px;
`;

export { Header };
