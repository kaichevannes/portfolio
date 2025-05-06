import { styled } from '@linaria/react';
import { Dialog, VisuallyHidden } from 'radix-ui';
import Link from 'next/link';

import { WEIGHTS, QUERIES } from '@/constants';
import { useTheme } from '@/components/ThemeProvider';

import Volume2 from '@/svg/volume-2.svg';
import Sun from '@/svg/sun.svg';
import Moon from '@/svg/moon.svg';
import Menu from '@/svg/menu.svg';
import Close from '@/svg/x.svg';

const Header = ({ cushioned }: { cushioned?: Boolean }) => {
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
      ThemeIcon = Placeholder;
  }

  const Wrap = cushioned ? CushionedWrapper : Wrapper

  return (
    <Wrap>
      <FrostedGlass />
      <Logo href='/#'>kai chevannes<Accent>.</Accent></Logo>
      <Nav>
        <NavLink href='/#about'>about</NavLink>
        <NavLink href='/#projects'>projects</NavLink>
        <NavLink href='/#contact'>contact</NavLink>
      </Nav>
      <Buttons>
        <Button>
          <IconWrapper>
            <Volume2 width={28} height={28} />
          </IconWrapper>
          sound
        </Button>
        <Button onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>
          <IconWrapper>
            <ThemeIcon width={28} height={28} />
          </IconWrapper>
          {theme}
        </Button>
      </Buttons>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <MobileButton>
            <Menu width={44} height={44} />
          </MobileButton>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Overlay />
          <Content>
            <VisuallyHidden.Root>
              <Dialog.Title>Menu</Dialog.Title>
              <Dialog.Description>Mobile navigation</Dialog.Description>
            </VisuallyHidden.Root>
            <Dialog.Close asChild>
              <CloseButton>
                <Close width={44} height={44} />
              </CloseButton>
            </Dialog.Close>
            <MobileNav>
              <MobileNavLink href='/#about'>about</MobileNavLink>
              <MobileNavLink href='/#projects'>projects</MobileNavLink>
              <MobileNavLink href='/#contact'>contact</MobileNavLink>
            </MobileNav>
            <MobileButtons>
              <MobileMenuButton onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>
                <IconWrapper>
                  <ThemeIcon width={44} height={44} />
                </IconWrapper>
                {theme}
              </MobileMenuButton>
            </MobileButtons>
          </Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Wrap>
  )
}

const Wrapper = styled.header`
  --default-top: 0;
  --default-padding-top: 8px;
  isolation: isolate;
  position: sticky;
  z-index: 1;
  top: var(--default-top);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: var(--default-padding-top);

  & * {
    position: relative;
  }
`;

const CushionedWrapper = styled(Wrapper)`
  top: -48px;
  padding-top: calc(48px + 8px);

  @media ${QUERIES.tabletAndDown} {
    top: var(--default-top);
    padding-top: var(--default-padding-top);
  }
`;

const FrostedGlass = styled.div`
  position: fixed;
  inset: 0;
  height: 148px;
  background: linear-gradient(
    to bottom,
    var(--color-background) 0%,
    transparent 50%
  );
  backdrop-filter: blur(4px);
  mask-image: linear-gradient(
    to bottom,
    black 0% 50%,
    transparent 50% 100%
  );
  pointer-events: none;

  @media ${QUERIES.tabletAndDown} {
    height: 162px;
  }
`;

const Logo = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: ${32 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  white-space: nowrap;
`;

const Accent = styled.span`
  color: var(--color-primary);
`;

const Nav = styled.nav`
  color: var(--color-grey900);
  display: flex;
  gap: 48px;

  @media ${QUERIES.tabletAndDown} {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: inherit;
  text-decoration: none;
  font-weight: ${WEIGHTS.semibold};
  font-size: ${20 / 16}rem;

  &::after {
    content: '';
    position: absolute;
    top: 90%;
    left: -5%;
    width: 110%;
    height: 3px;
    background: var(--color-primary);
    transition: 
      top 0ms 400ms,
      opacity 400ms;
    border-radius: 32px;
    opacity: 0;
  }

  &:hover {
    &::after {
      top: 100%;
      opacity: 1;
      transition: 
        top 250ms ease-out, 
        opacity 300ms ease-out;
    }
  }
`;

const Buttons = styled.div`
  color: var(--color-grey900);
  display: flex;
  justify-content: flex-end;
  gap: 16px;

  @media ${QUERIES.tabletAndDown} {
    display: none;
  }
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

const MobileButton = styled(Button)`
  display: none;
  transform: translateY(8px);

  @media ${QUERIES.tabletAndDown} {
    display: revert;
  }
`;

const IconWrapper = styled.div`
  align-self: center;
`;

const CloseButton = styled(MobileButton)`
  color: var(--color-grey900);

  position: absolute;
  top: 5px;
  right: 31px;
`;

const Placeholder = styled.div`
  width: 80px;
  height: 28px;
`;

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  z-index: 1;
  inset: 0;
  background: var(--color-grey500);
  opacity: 0.5;
`;

const Content = styled(Dialog.Content)`
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background);
  width: clamp(300px, 80%, 600px);
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--color-grey900);
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  align-items: center;
  flex: 3;
`;

const MobileButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  transform: translateY(-48px);
`;

const MobileMenuButton = styled(MobileButton)`
  translate: revert;
  display: flex;
  font-size: ${32 / 16}rem;
`;

const MobileNavLink = styled(NavLink)`
  display: block;
  font-size: ${32 / 16}rem;
  padding: 12px;
  width: 100%;
  text-align: center;
`;

export { Header };
