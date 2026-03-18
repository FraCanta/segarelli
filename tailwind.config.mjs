/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px",
        "2xs": "375px",
        sm: "400px",
        sms: "500px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1500px",
        "2xla": "1650px",
        fxl: "1920px",
        "3xl": "2560px",
        "4xl": "3840px",
      },
      colors: {
        primary: "#5F6738",
        body: "#8F8F8F",
        white: "#ffffff",
        siena: "#BF7116",
        blu: "#151D25",
        yellow: "#f8f6ec",
      },
    },
  },
  plugins: [],
};
