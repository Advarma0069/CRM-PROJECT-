/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(from|to)-(indigo|blue|green|yellow|purple|pink|orange|cyan)-(400|500|600|700)/,
    },
  ],
};
