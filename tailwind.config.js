/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {    
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#006AE6',
        bgDark: "#0F1014",
        lightDark:"#2A2C38",   
      },
      fontFamily: {
        sans: ["Manrope", 'Inter', 'Arial']
      }
    },
  },
  plugins: [],
}