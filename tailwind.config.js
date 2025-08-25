/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'iphone': '60px',
      },
      animation: {
        'dynamic-island': 'dynamic-island 0.3s ease-in-out',
      },
      keyframes: {
        'dynamic-island': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
