/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
        '3xl': '1600px',
        '4xl': '1920px'
      },
      fontFamily: {
        'inter': ['Inter', 'Arial', 'sans-serif'],
      },
      spacing: {
        22: '5.5rem',
        50: '12.5rem',
        65: '16.25rem',
      },
    },
    zIndex: {
      1: '1',
      2: '2',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      60: '60',
      70: '70',
      80: '80',
      90: '90',
      100: '100',
      110: '110',
    },
  },
  plugins: [],
}