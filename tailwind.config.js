/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
        vazirmatn: ["Vazirmatn", "sans-serif"],
      },
      zIndex: {
        2147483645: "2147483645",
      },
      colors: {
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        "leva-1": "#181C20",
        "leva-2": "#292D39",
        "leva-3": "#007BFF",
        "leva-4": "#111827",
        "leva-5": "#0c0e10",
      },
    },
  },
  plugins: [nextui()],
};
