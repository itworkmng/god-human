/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
  important: true,
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1700px",
    },
    extend: {
      colors: {
        primary: {
          25: "#dcebfa",
          50: "#c4e1ff",
          100: "#a8d3ff",
          200: "#88c1fc",
          300: "#56a7fc",
          400: "#469efa",
          500: "#3796fa",
          600: "#288ffc",
          700: "#1f8bff",
          800: "#1284ff",
          900: "#0079fb",
        },
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F4F5F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        error: {
          25: "#FFFBFA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
        },
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
          800: "#05603A",
          900: "#054F31",
        },
        blue: colors.sky,
        red: colors.rose,
        indigo: colors.indigo,
        black: colors.black,
        white: colors.white,
        green: colors.emerald,
        purple: colors.violet,
      },
      textColor: {},
      animation: {
        scaleX: "scaleX 0.5s ease-in-out alternate",
      },
      keyframes: {
        scaleX: {
          "0%": { transform: "scaleX(0.6)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
    fontFamily: {
      inter: "Inter, sans-serif",
    },
  },
};
