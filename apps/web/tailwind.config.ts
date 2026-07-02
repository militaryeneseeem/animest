import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: 'hsl(var(--brand))', foreground: 'hsl(var(--brand-foreground))' } },
      boxShadow: { glow: '0 0 80px rgb(124 58 237 / 0.25)' },
    },
  },
  plugins: [],
};
export default config;
