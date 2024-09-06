import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./libs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // PrimaryColors
      almostBlack: "rgba(var(--almostBlack))",
      textGray: "rgba(var(--textGray))",
      paragraphGray: "rgba(var(--paragraphGray))",
      sidebarNavHover: "rgba(var(--sidebarNavHover))",
      inputTextColor: "rgba(var(--inputTextColor))",
      bgGray: "rgba(var(--bgGray))",
      white: "rgba(var(--white))",
      // Secondary Colors
      hoverBlue: "rgba(var(--hoverBlue))",
      defaultBlue: "rgba(var(--defaultBlue))",
      disabledBlue: "rgba(var(--disabledBlue))",

      hoverRed: "rgba(var(--hoverRed))",
      defaultRed: "rgba(var(--defaultRed))",
      disabledRed: "rgba(var(--disabledRed))",

      hoverGreen: "rgba(var(--hoverGreen))",
      defaultGreen: "rgba(var(--defaultGreen))",
      disabledGreen: "rgba(var(--disabledGreen))",
    },
    extend: {
      transitionProperty: {
        transform: "transform",
      },
    },
  },
  plugins: [],
};
export default config;
