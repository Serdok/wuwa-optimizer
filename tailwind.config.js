import forms from '@tailwindcss/forms';


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'rarity-1': '#bababa',
        'rarity-2': '#9cf3b0',
        'rarity-3': '#a9eeff',
        'rarity-4': '#ffbefd',
        'rarity-5': '#eae287',
      },
    },
  },
  plugins: [forms],
}

