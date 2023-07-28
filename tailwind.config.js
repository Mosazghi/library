/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      borderWidth: {
        8: "12px",
      },
      gridTemplateColumns: {
        book: "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
};
