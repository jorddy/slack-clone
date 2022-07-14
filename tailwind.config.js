/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slack: "#3f0f40",
        "slack-accent": "#421f44"
      }
    }
  },
  plugins: []
};
