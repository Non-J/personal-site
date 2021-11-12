const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    screens: {
      sm: '475px',
      md: '768px',
      lg: '1024px',
      xl: '1600px',
    },
    extend: {
      fontFamily: {
        sans: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
