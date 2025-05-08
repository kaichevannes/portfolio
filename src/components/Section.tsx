import { styled } from '@linaria/react';
import React, { ReactNode, CSSProperties } from 'react'
import Image from 'next/image';

import { WEIGHTS, QUERIES } from '@/constants';

const Section = ({ children, title }: { children: ReactNode, title: string }) => {
  const numChildren = React.Children.count(children);

  return (
    <Wrapper style={{ '--num-children': numChildren } as CSSProperties}>
      <Title>
        <Sticky>{title}</Sticky>
      </Title>
      {/* Set the grid row so we can have a fully spanning section title. */}
      {React.Children.toArray(children).map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            style: {
              gridRow: index + 1,
            }
          } as CSSProperties);
        }
        return child;
      })}
    </Wrapper>
  );
};

const FullBleed = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  margin-left: auto;
  margin-right: auto;
`;

Section.Contents = styled.div`
  grid-column: contents;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey500);

  ${FullBleed} + & {
    margin-top: -8px;
  }
`;

Section.Image = ({ src, intrinsicWidth, intrinsicHeight, alt, caption, ...props }:
  { src: string, intrinsicWidth: number, intrinsicHeight: number, alt: string, caption: string }) => {
  return (
    <FullBleed {...props}>
      <figure>
        <ImageWrapper style={{ '--aspect-ratio': `${intrinsicWidth} / ${intrinsicHeight}` } as CSSProperties}>
          <Image
            src={src}
            alt={alt}
            fill
            quality={100}
            style={{
              borderRadius: 8,
              boxShadow: 'var(--shadow)',
            }}
          />
        </ImageWrapper>
        <Caption>{caption}</Caption>
      </figure>
    </FullBleed>
  )
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: [title-start] 4fr [title-end contents-start] 6fr [contents-end];
  grid-template-rows: repeat(var(--num-children), auto);
  gap: 24px 32px;

  @media ${QUERIES.tabletAndDown} {
    display: flex;
    flex-direction: column;
  };
`;


const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: var(--aspect-ratio);
`;

const Caption = styled.figcaption`
  padding-top: 16px;
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.regular};
  color: var(--color-grey300);
  text-align: center;
`;

const Title = styled.h2`
  grid-column: title;
  grid-row: -1 / 1;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey700);

  @media ${QUERIES.tabletAndDown} {
    font-size: ${24 / 16}rem;
    font-weight: ${WEIGHTS.semibold};
    color: var(--color-grey900);
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 72px;

  @media ${QUERIES.tabletAndDown} {
    position: revert;
    top: revert;
  }
`;

export { Section };
