/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'clouds': "url('https://i.pinimg.com/originals/cc/a0/70/cca0701bc8f1e3a909603335d62071da.jpg')"
      }
    },
  },
  plugins: [],
}

