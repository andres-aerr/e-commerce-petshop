/**
 * Design System - Pet Shop Ecommerce
 * Basado en 04-Identidad-Visual.md
 * Posicionamiento: "Exclusivo pero Accesible"
 */

export const colors = {
  primary: '#3C3731',
  accent: '#ED6435',
  secondary: '#45C1C7',
  bgWarm: '#FFE6D4',
  white: '#FFFFFF',
  grayDark: '#5A5A5A',
  grayLight: '#E8E8E8',
  blackSoft: '#2C2C2C',
} as const;

export const fonts = {
  sans: 'var(--font-plus-jakarta)',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

export const radii = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '999px',
} as const;

export const typography = {
  h1: {
    fontFamily: fonts.sans,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.5px',
    fontSize: 'clamp(32px, 5vw, 48px)',
  },
  h2: {
    fontFamily: fonts.sans,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.5px',
    fontSize: 'clamp(24px, 4vw, 32px)',
  },
  h3: {
    fontFamily: fonts.sans,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.5px',
    fontSize: 'clamp(20px, 3vw, 24px)',
  },
  body: {
    fontFamily: fonts.sans,
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: 'clamp(14px, 2vw, 16px)',
  },
  button: {
    fontFamily: fonts.sans,
    fontWeight: 600,
    fontSize: '16px',
    letterSpacing: '0.25px',
  },
} as const;
