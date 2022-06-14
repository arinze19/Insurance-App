// tailwind.config.js
const { colors: defaultColors } = require('tailwindcss/defaultTheme');

const colors = {
  ...defaultColors,
  ...{
    purple: {
      50: '#FCFCFF',
      100: '#F7F7FF',
      200: '#8E8CEE'
    },
    white: {
      100: '#FFFFFF'
    }
  }
}


module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: colors,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
