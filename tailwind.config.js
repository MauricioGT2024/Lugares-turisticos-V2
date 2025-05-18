// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // o 'media' si prefieres detección automática
  // tailwind.config.js

  theme: {
    extend: {
      colors: {
        dark: {
          background: "#181818",
          text: "#f5f5f5",
        },
        light: {
          background: "#ffffff",
          text: "#333333",
        },
      },
    },
  },
  plugins: [],
};
