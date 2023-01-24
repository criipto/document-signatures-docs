const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      blue: "#204C82",
      ash: {
        500: "#647185"
      },
      'deep-purple': {
        900: '#302935'
      }
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h2: {
              "margin-bottom": "0.6666666666666666em"
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
