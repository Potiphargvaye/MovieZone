/**
 * MovieZone design tokens, sampled from the Figma "Moviezone Mobile UI Kit".
 * The product is a single always-dark experience (no light theme in the design),
 * so these are used directly rather than branching on the system color scheme.
 */

export const Colors = {
  // Backgrounds
  background: '#141416',
  backgroundElevated: '#1C1C1F',
  card: '#212126',
  cardAlt: '#26262C',
  surface: '#2A2D3A',
  border: '#2E2E33',

  // Brand
  primary: '#E5202A',
  primaryDark: '#B5161E',

  // Text
  text: '#FFFFFF',
  textMuted: '#9A9AA3',
  textFaint: '#6E6E76',
  placeholder: '#77777F',

  // Status / seat map
  success: '#33C759',
  selected: '#CFE05B',
  available: '#D9D9DC',
  reserved: '#E5202A',

  // Misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.55)',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  display: 30,
} as const;

// Kept for compatibility with any lingering imports from the default template.
export const Fonts = {
  sans: 'System',
  rounded: 'System',
  mono: 'System',
};
