
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1B3B8A',
          light: '#2A4FA0',
          dark: '#132B6A',
        },
        navy: {
          DEFAULT: '#0A1628',
          light: '#0F2035',
          lighter: '#142842',
        },
        accent: {
          DEFAULT: '#00B74F',
          light: '#00D45B',
          dark: '#009A42',
        },
        surface: {
          light: '#F0F4FA',
          DEFAULT: '#FFFFFF',
        },
        muted: '#94A3B8',
        'text-light': '#E2E8F0',
      },
    },
  },
}
