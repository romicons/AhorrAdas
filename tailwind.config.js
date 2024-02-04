/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Comfortaa"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
