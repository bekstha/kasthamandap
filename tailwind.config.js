/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["CursiveFont", "cursive"],
      },
      backgroundImage: {
        "hero-section": "url('./assets/images/spices2.jpg')",
        "about-menu": "url('./assets/images/nepali_spices.jpeg')",
        "reservation-section": "url('./assets/images/thakali.png')",
      },
    },
  },
  plugins: [],
};
