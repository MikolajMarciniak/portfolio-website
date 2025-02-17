/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fill: "fill ease-out 2s forwards",
      },
      keyframes: {
        fill: {
          "0%": { maxWidth: "0%" },
          "100%": { maxWidth: "100%" },
        },
      },
    },
  },
  plugins: [],
};
