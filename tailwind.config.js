/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zysk-navy': '#1B2B3A',
        'zysk-gold': '#D48C45',
        'gemini-purple': '#AA74E0',
      },
    },
  },
  plugins: [],
}
