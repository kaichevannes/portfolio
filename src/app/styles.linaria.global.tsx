import { css } from '@linaria/core';

import { COLORS } from '@/constants';

export const globals = css`
  :global() {
    /*
    Josh's Custom CSS Reset
    https://www.joshwcomeau.com/css/custom-css-reset/
    */

    *, *::before, *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
    }

    @media (prefers-reduced-motion: no-preference) {
      html {
        interpolate-size: allow-keywords;
      }
    }

    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }

    input, button, textarea, select {
      font: inherit;
    }

    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }

    p {
      text-wrap: pretty;
    }
    h1, h2, h3, h4, h5, h6 {
      text-wrap: balance;
    }

    #root, #__next {
      isolation: isolate;
    }

    /*
    Color Styles
    */
    :root {
      --color-background: ${COLORS.beige};
      --color-text: ${COLORS.black};
      --color-highlight: ${COLORS.highlight};
      --color-grey-300: ${COLORS.grey[300]};
      --color-grey-500: ${COLORS.grey[500]};
      --color-grey-700: ${COLORS.grey[700]};
      --color-grey-900: ${COLORS.grey[900]};
      --color-primary: ${COLORS.primary};
    }

    [data-theme='dark'] {
      --color-background: ${COLORS.black};
      --color-text: ${COLORS.beige};
      --color-highlight: ${COLORS.highlight};
      --color-grey-300: ${COLORS.grey[300]};
      --color-grey-500: ${COLORS.grey[500]};
      --color-grey-700: ${COLORS.grey[700]};
      --color-grey-900: ${COLORS.grey[900]};
      --color-primary: ${COLORS.primary};
    }

    /*
    Background
    */
    html {
      background: var(--color-background);
    }
  }
`
