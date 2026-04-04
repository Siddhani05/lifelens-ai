/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          900: '#4c1d95',
        },
        cosmic: {
          900: '#0B0B1A',
          800: '#15152F',
          indigo: '#5C38FF',
          neon: '#E02CFF',
          cyan: '#00F0FF',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'glow-line': 'glowLine 3s linear infinite',
        'aurora-1': 'auroraOne 20s infinite alternate ease-in-out',
        'aurora-2': 'auroraTwo 25s infinite alternate-reverse ease-in-out',
        'aurora-3': 'auroraThree 30s infinite alternate ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(224, 44, 255, 0.4)' },
          '50%': { opacity: .7, boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        glowLine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        auroraOne: {
          '0%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate(5vw, -10vh) scale(1.2) rotate(10deg)' },
          '100%': { transform: 'translate(-5vw, 10vh) scale(0.9) rotate(-5deg)' }
        },
        auroraTwo: {
          '0%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate(-10vw, 5vh) scale(1.1) rotate(-10deg)' },
          '100%': { transform: 'translate(10vw, -5vh) scale(1.1) rotate(5deg)' }
        },
        auroraThree: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(5vw, 5vh) scale(1.3)' },
          '100%': { transform: 'translate(-5vw, -5vh) scale(0.8)' }
        }
      }
    },
  },
  plugins: [],
}