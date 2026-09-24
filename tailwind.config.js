/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pocket: {
          yellow: "#FCBE17",
          teal: "#179CBD",
          cyan: "#32D6FF",
          slate: "#526E87",
          page: "#F2F2F2",
          heart: "#FF1E00",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        nav: "0px 4px 16px rgba(0,0,0,0.10)",
        logo: "0px 4px 4px rgba(0,0,0,0.25)",
        talk: "3px 3px 3px #526E87",
      },
    },
  },
  plugins: [],
};
