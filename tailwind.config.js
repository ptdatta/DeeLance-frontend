/** @type {import('tailwindcss').Config} */
import tailwindcssRtl from "tailwindcss-rtl";
import tailwindCSSAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      roboto: "'Roboto', sans-serif",
    },

    extend: {
      colors: {
        transparent: "transparent",
        body: "#1B1C1E",
        "body-light": "#eeeeee",
        black: "black",
        white: "white",
        "blue-bg": "#263238",
        woodsmoke: {
          50: "#f7f7f8",
          100: "#eeeef0",
          200: "#d9d9de",
          300: "#b8b9c1",
          400: "#91939f",
          500: "#737584",
          600: "#5d5e6c",
          700: "#4c4d58",
          800: "#41414b",
          900: "#393941",
          950: "#0f0f11",
        },
        "green-haze": {
          50: "#effef5",
          100: "#d8ffea",
          200: "#b4fed6",
          300: "#7afbb6",
          400: "#3aee8f",
          500: "#10d76d",
          600: "#06a551",
          700: "#098c47",
          800: "#0d6e3c",
          900: "#0d5a34", // main
          950: "#00331a",
        },
        warning: {
          50: "#fffaec",
          100: "#fff3d3",
          200: "#ffe3a5",
          300: "#ffce6d",
          400: "#ffad32",
          500: "#ff930a",
          600: "#e97000", // main
          700: "#cc5902",
          800: "#a1450b",
          900: "#823a0c",
          950: "#461b04",
        },
        red: {
          50: "#fef2f2",
          100: "#fde3e3",
          200: "#fccccc",
          300: "#f9a8a8",
          400: "#f47575",
          500: "#eb5757", // main
          600: "#d62c2c",
          700: "#b42121",
          800: "#951f1f",
          900: "#7c2020",
          950: "#430c0c",
        },
      },

      borderWidth: {
        1: "1px",
      },
      spacing: {
        "navbar-height": "var(--navbar-height)",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideDownAndFade: "slideDownAndFade 200ms ease",
        slideLeftAndFade: "slideLeftAndFade 200ms ease",
        slideUpAndFade: "slideUpAndFade 200ms ease",
        slideRightAndFade: "slideRightAndFade 200ms ease",
        "indeterminate-bar":
          "indeterminate-bar 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite normal none running",
      },
    },
  },
  plugins: [tailwindcssRtl, tailwindCSSAnimate],
};
