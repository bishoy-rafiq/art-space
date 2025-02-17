/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'], // خط Cairo
        outfit: ['Outfit', 'sans-serif'], // خط Outfit
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#5F6FFF'
      }
      
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide') // إضافة الإضافة
  ],
}