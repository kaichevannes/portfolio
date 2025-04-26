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
