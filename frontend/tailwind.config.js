/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3B2C',
          light: '#2A4D3A',
          dark: '#152920'
        },
        accent: {
          DEFAULT: '#4CAF50',
          light: '#66BB6A',
          dark: '#388E3C'
        }
      },
      keyframes: {
        'modal-slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      animation: {
        'modal-slide-down': 'modal-slide-down 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
}

