/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-transparent': 'rgb(30 41 59 / .8)',
        'custom-red': '#FF5959',
        'custom-red-dark': '#a33838'
      }
    }
  }
}
