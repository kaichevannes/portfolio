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
  shadow: {
    light: `0deg 0% 7%`,
    dark: `46deg 33% 92%`,
  },
  text: {
    light: `hsl(0deg 0% 7%)`,
    dark: `hsl(46deg 33% 92%)`,
  },
  highlight: {
    light: `hsl(50deg 100% 78%)`,
    dark: `hsl(166deg 100% 24%)`,
  },
  primary: {
    light: `hsl(166deg 100% 24%)`,
    dark: `hsl(166deg 100% 30%)`,
  },
  grey300: {
    light: `hsl(55deg 8% 40%)`,
    dark: `hsl(60deg 4% 47%)`,
  },
  grey500: {
    light: `hsl(60deg 4% 29%)`,
    dark: `hsl(37deg 5% 60%)`,
  },
  grey700: {
    light: `hsl(37deg 5% 24%)`,
    dark: `hsl(60deg 4% 72%)`,
  },
  grey900: {
    light: `hsl(60deg 4% 19%)`,
    dark: `hsl(55deg 8% 82%)`,
  }
}

const WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

const BREAKPOINTS = {
  mobileMax: 600,
  tabletMax: 1000,
  laptopMax: 1500,
}

const QUERIES = {
  mobileAndDown: `(max-width: ${BREAKPOINTS.mobileMax / 16}rem)`,
  tabletAndDown: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  laptopAndDown: `(max-width: ${BREAKPOINTS.laptopMax / 16}rem)`,
}

export { type ColorType, COLORS, WEIGHTS, BREAKPOINTS, QUERIES };
