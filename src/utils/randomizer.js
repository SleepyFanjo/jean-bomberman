// Based on Lehmer LCG implementation

export const randomizerInit = (seed) => {
  const lcg = a => a * 48271 % 2147483647

  seed = lcg(seed || Math.random())

  return () => (seed = lcg(seed)) / 2147483647
}
