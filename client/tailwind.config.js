/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#111827",
        line: "#E5E7EB",
        panel: "#F8FAFC",
        brand: "#0F766E",
        accent: "#2563EB",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
