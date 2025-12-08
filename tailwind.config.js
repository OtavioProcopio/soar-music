/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#17A6D8', // Azul Principal
          secondary: '#4F6F74', // Verde/Teal do Texto
          accent: '#47BCD9', // Azul claro (Destaques)
          dark: '#0E7FAF', // Azul mais fechado (sombras)
          soar: '#4F6F74', // Verde/Teal (Alias)
          music: '#3E5E63', // Tom mais escuro do verde
          gray: {
            light: '#D2D2D2',
            DEFAULT: '#BEBEBE',
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  },
  plugins: [],
}
