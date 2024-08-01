import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: ["variant", ".darkTheme &"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: "var(--satoshi)",
        inter: "var(--inter)",
      },
      colors: {
        "light-silver": "#f3f4f6",
        "slate-gray": "#64748B",
        gainsboro: "#E8E8E8",
        "ghost-white": "#f9fafb",
        "lavender-gray": "#E5E7EB",
        silver: "#D1D5DB",
        "dark-blue": "#1C274C",
        "royal-purple": "#635BFF",
        "pale-purple": "#f7f7ff",
        green: "#0CBE5E",
        yellow: "#FFDD0F",
        red: "#feefef",
      },
      boxShadow: {
        dark: "0px 1px 2px 0px #5457761A",
      },
    },
  },
  plugins: [],
};
export default config;
