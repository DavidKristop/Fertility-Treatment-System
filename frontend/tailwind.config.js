// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'open-menu': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '70%': { 
            opacity: '0.9',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'close-menu': {
          '0%': { 
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': { 
            transform: 'translateX(-100%)',
            opacity: '0',
          },
        },
      },
      animation: {
        'open-menu': 'open-menu 0.2s ease-in-out forwards',
        'close-menu': 'close-menu 0.2s ease-in-out forwards', 
      },
    },
  },
};