export const DURATIONS = {
  QUICK: 0.25,
  SMALL: 0.35,
  MEDIUM: 0.4,
  MEDIUM_SLOW: 0.5,
  SLOW: 0.55,
  SLOWER: 0.6,
  SLOWEST: 0.7,
  LONG: 0.9,
  EXTRA_LONG: 1.1,
  ICON_SWITCH: 0.18,
} as const;

export const INTERVALS = {
  HERO_TYPING: 1400,
  WHOAMI_ROTATION: 3800,
  TINY: 0.03,
  SMALL: 0.05,
  GRID: 0.005,
} as const;

export const EASE = [0.22, 1, 0.36, 1] as const;

export const SPRINGS = {
  FILTER_PILL: { type: "spring" as const, stiffness: 380, damping: 30 },
  NAV_ACTIVE: { type: "spring" as const, stiffness: 380, damping: 30 },
  CURSOR_FAST: { type: "spring" as const, stiffness: 500, damping: 35, mass: 0.4 },
  CURSOR_SMOOTH: { type: "spring" as const, stiffness: 180, damping: 22 },
} as const;
