/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html', 
      './src/**/*.{js,ts,jsx,tsx}', 
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brandPrimary': '#6499E9',
        'buttonColor' : '#9EDDFF',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
