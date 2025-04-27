type ColorType = {
  [key: string]: {
    light: string;
    dark: string;
  }
}

const COLORS: ColorType = {
  background: {
    light: `hsl(46deg 33% 92%)`,
    dark: `hsl(0deg 0% 7%)`,
  },
  text: {
    light: `hsl(0deg 0% 7%)`,
    dark: `hsl(46deg 33% 92%)`,
  },
  highlight: {
    light: `hsl(50deg 100% 78%)`,
    dark: `hsl(50deg 100% 78%)`,
  },
  primary: {
    light: `hsl(166deg 100% 34%)`,
    dark: `hsl(166deg 100% 34%)`,
  },
  grey300: {
    light: `hsl(55deg 8% 74%)`,
    dark: `hsl(60deg 4% 19%)`,
  },
  grey500: {
    light: `hsl(60deg 4% 29%)`,
    dark: `hsl(37deg 5% 24%)`,
  },
  grey700: {
    light: `hsl(37deg 5% 24%)`,
    dark: `hsl(60deg 4% 29%)`,
  },
  grey900: {
    light: `hsl(60deg 4% 19%)`,
    dark: `hsl(55deg 8% 74%)`,
  }
}

const BREAKPOINTS = {
  mobileMax: 550,
  tabletMax: 1100,
  laptopMax: 1500,
}

const QUERIES = {
  mobileAndDown: `(max-width: ${BREAKPOINTS.mobileMax / 16}rem)`,
  tabletAndDown: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  laptopAndDown: `(max-width: ${BREAKPOINTS.laptopMax / 16}rem)`,
}

export { type ColorType, COLORS, BREAKPOINTS, QUERIES };
