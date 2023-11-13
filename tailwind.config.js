/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          cursive: ['CursiveFont', 'cursive'],
          dancing: ['Dancing Script', 'cursive'],
          satisfy:['Satisfy', 'cursive'],
          nanum:['Nanum Gothic Coding', 'cursive'],
          palanquin: ['Palanquin', 'sans-serif'],
          montserrat: ['Montserrat', 'sans-serif'],
        },
        colors: {
          'primary': "#ECEEFF",
          "coral-red": "#FF6452",
          "slate-gray": "#6D6D6D",
          "pale-blue": "#F5F6FF",
          "white-400": "rgba(255, 255, 255, 0.80)"
        },
        boxShadow: {
          '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
        },
        keyframes: {
          wiggle: {
            "0%, 100%": { transform: "rotate(-3deg)" },
            "50%": { transform: "rotate(3deg)" }
          }
        },
        animation: {
          wiggle: "wiggle 200ms ease-in-out",
        }
      },
    },
    plugins: [],
  };
  