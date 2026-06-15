import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3C3731',
        accent: '#ED6435',
        secondary: '#45C1C7',
        'bg-warm': '#FFE6D4',
        'gray-dark': '#5A5A5A',
        'gray-light': '#E8E8E8',
        'black-soft': '#2C2C2C',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(32px, 5vw, 48px)', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
        h2: ['clamp(24px, 4vw, 32px)', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
        h3: ['clamp(20px, 3vw, 24px)', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
      },
      spacing: {
        '4xs': '4px',
        '3xs': '8px',
        '2xs': '12px',
        xs: '16px',
        sm: '24px',
        md: '32px',
        lg: '48px',
        xl: '64px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '999px',
      },
    },
  },
  plugins: [],
};

export default config;
