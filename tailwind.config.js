/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/hooks/**/*.{js,jsx,ts,tsx}",
    "./src/data/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F5B800",
          cyan: "#00A8CC",
          teal: "#179CBD",
          slate: "#526E87",
          bg: "#efefee",
          red: "#ff3b4d",
          line: "#dfe4e6",
          panel: "#e2e4e6",
          soft: "#e5e5e5",
          "text-dark": "#111827",
          "text-muted": "#4a5568",
          "body-muted": "#55606a",
          "subtle-muted": "#676d75",
        },
        social: {
          whatsapp: "#25D366",
        },
        google: {
          blue: "#4285F4",
          red: "#EA4335",
          yellow: "#FBBC05",
          green: "#34A853",
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
