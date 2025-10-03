import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tsa: {
          navy: '#1e3a8a',
          red: '#dc2626',
          white: '#ffffff',
        },
        school: {
          primary: '#1e40af',
          secondary: '#dc2626',
        }
      },
      fontFamily: {
        'heading': ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
        'body': ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontWeight: {
        'thin': '300',
        'light': '400',
        'normal': '500',
        'medium': '600',
        'semibold': '700',
        'bold': '800',
      },
      letterSpacing: {
        'tight': '-0.025em',
        'snug': '-0.015em',
        'relaxed': '0.025em',
        'wide': '0.05em',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
};
export default config;
