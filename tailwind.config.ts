import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1610', // (20 14.3% 4.1%)
        foreground: '#f6f5fc', // (60 9.1% 97.8%)
        card: '#1a1610',
        'card-foreground': '#f6f5fc',
        popover: '#1a1610',
        'popover-foreground': '#f6f5fc',
        primary: '#ffd54f', // (47.9 95.8% 53.1%)
        'primary-foreground': '#4e3d1e', // (26 83.3% 14.1%)
        secondary: '#211d19', // (12 6.5% 15.1%)
        'secondary-foreground': '#f6f5fc', // (60 9.1% 97.8%)
        muted: '#211d19',
        'muted-foreground': '#9b9488', // (24 5.4% 63.9%)
        accent: '#211d19',
        'accent-foreground': '#f6f5fc',
        destructive: '#993b31', // (0 62.8% 30.6%)
        'destructive-foreground': '#f6f5fc', // (60 9.1% 97.8%)
        border: '#211d19',
        input: '#211d19',
        ring: '#55df67', // (35.5 91.7% 32.9%)
        'chart-1': '#0077cc', // (220 70% 50%)
        'chart-2': '#33aa77', // (160 60% 45%)
        'chart-3': '#cc7733', // (30 80% 55%)
        'chart-4': '#9955cc', // (280 65% 60%)
        'chart-5': '#ff3366', // (340 75% 55%)
      },
      borderRadius: {
        default: '0.5rem',
      },
    },
  },
} satisfies Config;
