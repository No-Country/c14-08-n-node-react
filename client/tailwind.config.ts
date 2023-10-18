// const withMT = require("@material-tailwind/react/utils/withMT");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#ECEEFF",
        "gray-700": "#3E3C3D",
        "gray-600": "#696969 ",
        "gray-500": "#8C8C8C",
        "gray-400": "#D2D2D2",
        "gray-300": "#D9D9D9",
        "gray-200": "#DDDDDD",
        "gray-100": "#F5F5F5",
      },
      screens: {
        xs: "475px",
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};

export default config;

// export default withMT(config);
