/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*.component.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-out': 'slideOut 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'progress': 'progress 5s linear forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}