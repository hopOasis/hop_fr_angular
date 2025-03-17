/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        accent: {
          500: "#FF9A00",
          600: "#E88C00",
        },
        black: {
          500: "rgb(19,19,19)",
          100: "rgb(105,105,105)",
          50: "rgb(179,179,179)",
          40: "rgb(232,232,232)",
          30: "rgb(244,244,244)",
        },
        white: {
          500: "rgb(255,251,244)",
          50: "rgb(250,250,250)",
        },
        grey: {
          500: "rgb(41,41,41)",
        },
      },
    },
  },
  plugins: [],
};
