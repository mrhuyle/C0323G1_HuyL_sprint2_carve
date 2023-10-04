/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neutralSilver': '#F5F7FA',
        'purpleTone': '#9400FF',
        'brandPrimary': '#330099',
        'neutralGrey': '#717171',
      },
    },
  },
  plugins: [],
};
