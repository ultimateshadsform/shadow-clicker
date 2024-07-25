import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        LilitaOne: ['Lilita One', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
