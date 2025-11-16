/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: {
    tailwindcssAnimate: require("tailwindcss-animate"),
    typography: require("@tailwindcss/typography"),
  },
};
