import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        era: {
          blue: '#1B3A8B',
          'blue-light': '#E8EEF7',
          green: '#2E7D5B',
          'green-light': '#E8F0EC',
          purple: '#7B5BA6',
          'purple-light': '#F0EBF5',
          dark: '#1A1A2E',
          cream: '#F3ECE0',
          'cream-soft': '#F8F2E8',
          page: '#FBF6EE',
          coffee: '#3D2817',
          gold: '#C9A876',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-h1': 'clamp(2.5rem, 6vw, 5rem)',
        'fluid-h2': 'clamp(2rem, 4vw, 3.5rem)',
        'fluid-h3': 'clamp(1.5rem, 2.5vw, 2rem)',
        'fluid-body': 'clamp(1rem, 1.2vw, 1.125rem)',
      },
      borderRadius: {
        card: '20px',
        btn: '12px',
      },
      backgroundImage: {
        'coffee-bean-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cellipse cx='30' cy='30' rx='10' ry='14' transform='rotate(30 30 30)'/%3E%3Cpath d='M30 18 Q32 30 30 42' stroke='%23ffffff' stroke-opacity='0.08' stroke-width='1' fill='none' transform='rotate(30 30 30)'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.6' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
