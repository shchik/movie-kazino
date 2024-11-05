/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
