/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "peach-bg": "#FFEEE6",
        "box-gray": "#D9D9D9",
        "box-mauve": "#C0AAAA",
        "delete-pink": "#FEF4F4",
      },
    },
  },
  plugins: [],
};
