/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'sm': ['16px', '1.5'],
        'base': ['18px', '1.6'],
        'lg': ['20px', '1.75'],
        'xl': ['24px', '1.8'],
        '2xl': ['28px', '2'],
      },
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '16px',
            lineHeight: '1.5',
            p: {
              marginBottom: '1rem'
            },
            h1: {
              fontSize: '2.25rem',
              marginBottom: '1.5rem'
            },
            h2: {
              fontSize: '1.875rem',
              marginBottom: '1.25rem'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}