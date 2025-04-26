import { styled } from '@linaria/react';

import { Header } from '@/components/Header';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';

export default function App() {
  return (
    <MaxWidthWrapper>
      <Header />
      <main>
        <Wrapper>
          <p>Hello World</p>
        </Wrapper>
      </main>
    </MaxWidthWrapper>
  );
}

const Wrapper = styled.div`
  color: green;
`;
