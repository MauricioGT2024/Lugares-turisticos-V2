// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Activa el soporte para Dark Mode usando la clase 'dark'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E2E8F0", // Color claro
          900: "#2D3748", // Color oscuro
        },
        secondary: {
          500: "#38B2AC", // Teal color
        },
      },
    },
  },
  plugins: [],
};
