/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        '500' : ['600']
      },

      fontSize: {
        '40px': ['40px'],
        '8px': ['8px'],
        '5px': ['5px'],

      },
      fontFamily: {
        'Poppins': ['Poppins', "sans-serif"],
        'Cairo' : ['Cairo', "sans-serif"]
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}