/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "gray-200": "var(--gray-200)",
        "gray-300": "var(--gray-300)",
        "orange-base": "var(--orange-base)",
        "orange-shape": "var(--orange-shape)",
        "blue-light": "var(--blue-light)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".x-title-md": {
          fontFamily: ['"DM Sans"', "sans-serif"],
          fontSize: "18px",
          lineHeight: "120%",
          fontWeight: "bold",
        },
        ".x-title-lg": {
          fontFamily: ['"DM Sans"', "sans-serif"],
          fontSize: "24px",
          lineHeight: "120%",
          fontWeight: "bold",
        },
        ".x-title-sm": {
          fontFamily: ['"DM Sans"', "sans-serif"],
          fontSize: "14px",
          lineHeight: "120%",
          fontWeight: "bold",
        },
        ".x-subtitle": {
          fontFamily: ["Poppins", "sans-serif"],
          fontSize: "12px",
          lineHeight: "120%",
          fontWeight: "600", //semibold
        },
        ".x-body-md": {
          fontFamily: ["Poppins", "sans-serif"],
          fontSize: "12px",
          lineHeight: "120%",
          fontWeight: "400", //regular
        },
        ".x-body-sm": {
          fontFamily: ["Poppins", "sans-serif"],
          fontSize: "10px",
          lineHeight: "120%",
          fontWeight: "400", //regular
        },
        ".x-body-xs": {
          fontFamily: ["Poppins", "sans-serif"],
          fontSize: "8px",
          lineHeight: "120%",
          fontWeight: "400", //regular
        },
        ".x-label-md": {
          fontFamily: ["Poppins", "sans-serif"],
          fontSize: "8px",
          lineHeight: "120%",
          fontWeight: "500", //medium
          textTransform: "uppercase",
        },
        ".x-label-sm": {
          fontFamily: ["Poppins", "sans-serif"],
          fontSize: "6px",
          lineHeight: "120%",
          fontWeight: "500", //medium
          textTransform: "uppercase",
        },
        ".x-action-md": {
          fontFamily: ["Poppins", "sans-serif"],
          fontSize: "12px",
          lineHeight: "120%",
          fontWeight: "500", //medium
        },
        ".x-action-sm": {
          fontFamily: ["Poppins", "sans-serif"],
          fontSize: "10px",
          lineHeight: "120%",
          fontWeight: "500", //medium
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
