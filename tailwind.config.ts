import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Optional: Center the container
        padding: '2rem', // Optional: Add padding
      },
      colors: {
        primary: "#32A4C8",
        secondary: "#B80069",
      },
    },
  },
  plugins: [],
};

export default config;
