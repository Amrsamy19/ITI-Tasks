/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans Arabic'", "sans-serif"], // 👈 Default font (for Arabic & English)
      },
    },
  },
  plugins: [],
};
