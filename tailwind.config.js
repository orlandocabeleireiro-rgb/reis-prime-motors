/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["Oswald", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        display: ["Bebas Neue", "Oswald", "sans-serif"],
      },
      colors: {
        // Tema escuro (secções de destaque: hero, rodapé, cartões de dados)
        ink: "#0e0e0e",
        surface: "#181818",
        line: "#2c2c2c",
        cream: "#f2efe9",
        muted: "#9a9a9a",
        // Tema claro (fundo geral do site)
        paper: "#f7f7f5",
        "paper-line": "#e2e2df",
        "paper-text": "#141414",
        "paper-muted": "#6b6b68",
        // Prateado (acento de marca)
        silver: {
          DEFAULT: "#8a8d91",
          light: "#e8eaec",
          dark: "#6e7276",
        },
      },
      backgroundImage: {
        "silver-gradient": "linear-gradient(135deg, #6e7276, #e8eaec 45%, #8a8d91)",
      },
    },
  },
  plugins: [],
};
