/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "civic-navy": "#1a365d",
        "civic-blue": "#2c5282",
        "civic-purple": "#805ad5",
        "civic-teal": "#38b2ac",
        "civic-light": "#e8eef4",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
      fontSize: {
        "senior-sm": "1.125rem",
        "senior-base": "1.25rem",
        "senior-lg": "1.5rem",
        "senior-xl": "2rem",
        "senior-2xl": "2.5rem",
      },
      borderRadius: {
        xl: "16px",
      },
    },
  },
  plugins: [],
};
