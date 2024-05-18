/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '7xl': '5rem', // Example of adding a larger font size
      }
    }
  },
  plugins: [],
}

