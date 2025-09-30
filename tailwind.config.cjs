/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D82479",
        secondary: "#F2F4F8",
      },
      borderRadius: {
        btn: "0.5rem",
      },
    },
  },
  plugins: [],
};
