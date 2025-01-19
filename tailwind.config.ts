import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "grey": "var(--grey)",
        "white": "var(--white)",
        "disabled": "var(--disabled)",
        "dark-grey": "var(--dark-grey)",
      },
      backgroundImage: {
        'checkered-pattern': "url('/pixels1.png')", // Substitua pelo caminho da sua imagem de padrão xadrez
        'checkered-pattern-bottom': "url('/pixels.png')", // Substitua pelo caminho da sua imagem de padrão xadrez
      },
      spacing: {
        '101': '26rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
