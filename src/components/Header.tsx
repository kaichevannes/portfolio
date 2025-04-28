import { styled } from '@linaria/react';

import { WEIGHTS } from '@/constants';

const Header = () => {
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
          Icon
          sound
        </Button>
        <Button>
          Icon
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
  flex: 1;
  font-size: ${32 / 16}rem;
  font-weight: ${WEIGHTS.bold};
`;

const Accent = styled.span`
  color: var(--color-primary);
`;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: ${WEIGHTS.semibold};
  font-size: ${20 / 16}rem;
`;

const Buttons = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const Button = styled.button`
  display: flex;
  gap: 8px;
`

export { Header };
