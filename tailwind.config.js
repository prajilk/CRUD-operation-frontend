/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Lobster: 'Lobster'
      },
      colors: {
        primary: {
          400: '#7c3aed'
        },
        blueC: {
          400: '#0098ff'
        },
        violetC: {
          500: '#7b35c8'
        }
      },
      inset: {
        34: '34%',
        50: '50%'
      }
    }
  },
  plugins: [],
}