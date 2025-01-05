/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Define custom color palette for consistency
        backgroundStart: '#1a1b41',
        backgroundEnd: '#000428',
        textPrimary: '#c9d1d9',
        linkColor: '#58a6ff',
        codeBg: '#1f2937',
      },
      backgroundImage: {
        // Gradient for the site background
        'site-gradient': 'linear-gradient(to bottom, #1a1b41, #000428)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#c9d1d9',
            a: {
              color: '#58a6ff',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
              '&:focus': {
                outline: '2px solid #58a6ff',
                outlineOffset: '2px',
              },
            },
            strong: {
              color: '#c9d1d9',
            },
            code: {
              backgroundColor: '#1f2937',
              padding: '0.2em 0.4em',
              borderRadius: '4px',
              color: '#c9d1d9',
            },
            pre: {
              backgroundColor: '#1f2937',
              borderRadius: '6px',
              padding: '1em',
              overflowX: 'auto',
            },
            h1: { color: '#c9d1d9' },
            h2: { color: '#c9d1d9' },
            h3: { color: '#c9d1d9' },
            h4: { color: '#c9d1d9' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
