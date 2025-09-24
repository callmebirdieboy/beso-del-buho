/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: "#121212",
          light: "#F2F2F2",
          primary: "#8C1C13",
          secondary: "#4B3F72",
          textMain: "#EAEAEA",
          textSecondary: "#B0B0B0",
        },
        fontFamily: {
          playfair: ["'Playfair Display'", "serif"],
          inter: ["Inter", "sans-serif"],
        },
      },
    },
    plugins: [],
  }
  