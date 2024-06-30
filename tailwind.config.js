/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  
    theme: {
      extend: {
        boxShadow: {
          'fuchsia-custom': ' 0 0 20px 10px rgba(245, 0, 245, 0.5)',
          'image-shadow': '0 0 15px 3px rgb(0,0,0)'
        },
      },
    },
    variants: {},
    plugins: [],
  }
  
 


