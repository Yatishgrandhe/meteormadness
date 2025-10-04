import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'secondary-bg': 'var(--secondary-bg)',
        'primary-blue': 'var(--primary-blue)',
        'primary-blue-dark': 'var(--primary-blue-dark)',
        'accent-orange': 'var(--accent-orange)',
        'accent-red': 'var(--accent-red)',
        'success-green': 'var(--success-green)',
        'warning-yellow': 'var(--warning-yellow)',
        'text-muted': 'var(--text-muted)',
        'border-color': 'var(--border-color)',
        'card-bg': 'var(--card-bg)',
        'hover-bg': 'var(--hover-bg)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
