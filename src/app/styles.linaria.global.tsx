import { css } from '@linaria/core';

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
    Fonts
    */
    body {
      font-family: 'Inter', sans-serif;
    }

    /*
    Colors
    */
    body {
      background: var(--color-background);
      color: var(--color-text);
    }

    ::selection {
      background: var(--color-highlight);
    }

    /*
    Shadows
    */
    :root {
      --shadow-color: var(--color-shadow);
      --shadow:
        0.4px 0.7px 1.1px hsl(var(--shadow-color) / 0.02),
        1.6px 2.7px 4.5px -0.1px hsl(var(--shadow-color) / 0.05),
        2.9px 4.9px 8.1px -0.2px hsl(var(--shadow-color) / 0.08),
        5.1px 8.5px 14.1px -0.4px hsl(var(--shadow-color) / 0.12),
        9px 14.9px 24.8px -0.5px hsl(var(--shadow-color) / 0.15);
    }

    /*
    Smooth scrolling
    */
    @media (prefers-reduced-motion: no-preference) {
      html {
        scroll-behavior: smooth;
      }
    }
  }
`
