import { styled } from '@linaria/react';

import { QUERIES } from '@/constants';

const MaxWidthWrapper = styled.div`
  position: relative;
  max-width: min(100%, 1100px);
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;

  @media ${QUERIES.tabletAndDown} {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media ${QUERIES.mobileAndDown} {
    padding-left: 8px;
    padding-right: 8px;
  }
`

export { MaxWidthWrapper }
