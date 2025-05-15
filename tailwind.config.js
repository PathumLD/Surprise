/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F7',
          100: '#FFEAEF',
          200: '#FFCBD8',
          300: '#FFA8C0',
          400: '#FF7AA3',
          500: '#FF4D85',
          600: '#FF1F67',
          700: '#FF004D',
          800: '#D60041',
          900: '#A30031',
        },
        secondary: {
          50: '#FFF0F5',
          100: '#FFE1EC',
          200: '#FFC3D9',
          300: '#FFA5C6',
          400: '#FF87B3',
          500: '#FF69A0',
          600: '#FF4B8D',
          700: '#FF2D7A',
          800: '#FF0F67',
          900: '#DB0051',
        },
        accent: {
          50: '#FFFAFA',
          100: '#FFF5F5',
          200: '#FFEBEB',
          300: '#FFE1E1',
          400: '#FFD7D7',
          500: '#FFCDCD',
          600: '#FFC3C3',
          700: '#FFB9B9',
          800: '#FFAFAF',
          900: '#FFA5A5',
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        spin: 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};