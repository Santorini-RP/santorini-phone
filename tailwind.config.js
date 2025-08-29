/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ios-dark-bg': '#000000',
        'ios-dark-card': '#1C1C1E',
        'ios-dark-input': '#2C2C2E',
        'ios-light-open': '#F9F9F9',
        'ios-light-closed': '#F2F2F7',
      }
    },
  },
  plugins: [],
}
