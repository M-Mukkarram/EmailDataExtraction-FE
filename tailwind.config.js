/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['text-center', 'text-start', 'text-end'],
  theme: {
    extend: {
      colors: {
        primary: '#001E80',
        secondary: '#535353',
        teal: '#c6d3ff',
        sp_gray: '#444444',
        tealv1: '#afc2ff',
        text_primary: '#4D4D4D',
        heading: '#535353',
        button_bg: '#F3F0F0',
        text_secondary: '#8A8989',
        cinnabar: '#E22C06',
        light_gray: '#E8E8E8',
        light_coral: '#f9d5cd',
        lemon_chiffon: '#FCEDB7',
        davys_grey: '#434343',
        cultured: '#F7F7F7',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
