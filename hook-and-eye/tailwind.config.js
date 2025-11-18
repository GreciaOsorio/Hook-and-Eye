
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT ({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'darkGrotesque': ["Darker Grotesque"],
        'sans': ["Darker Grotesque", 'sans-serif'],
      }
    },
  },
  plugins: [],
})

