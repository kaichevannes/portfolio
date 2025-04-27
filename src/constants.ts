export const COLORS = {
  beige: `hsl(46deg 33% 92%)`,
  black: `hsl(0deg 0% 7%)`,
  highlight: `hsl(50deg 100% 78%)`,
  primary: `hsl(166deg 100% 34%)`,
  grey: {
    300: `hsl(55deg 8% 74%)`,
    500: `hsl(60deg 4% 29%)`,
    700: `hsl(37deg 5% 24%)`,
    900: `hsl(60deg 4% 19%)`,
  },
}

export const BREAKPOINTS = {
  mobileMax: 550,
  tabletMax: 1100,
  laptopMax: 1500,
}

export const QUERIES = {
  mobileAndDown: `(max-width: ${BREAKPOINTS.mobileMax / 16}rem)`,
  tabletAndDown: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  laptopAndDown: `(max-width: ${BREAKPOINTS.laptopMax / 16}rem)`,
}
