/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'serif'],
        sans: ['"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        gov: {
          navy: '#002147',
          'navy-dark': '#001630',
          'navy-light': '#0a3871',
          'navy-muted': '#1e3a5f',
          saffron: '#e67300',
          'saffron-light': '#fff4e6',
          'saffron-border': '#f59e0b',
          green: '#138808',
          'green-light': '#f0fdf4',
          'green-border': '#86efac',
          maroon: '#800000',
          ash: '#f4f6f8',
          paper: '#fcfcfc',
          line: '#d1d5db',
          'line-dark': '#9ca3af',
          text: '#111827',
          'text-muted': '#4b5563',
          red: '#991b1b',
          'red-bg': '#fef2f2',
          amber: '#92400e',
          'amber-bg': '#fffbeb',
          badge: '#e2e8f0',
        },
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '1px',
        md: '2px',
        lg: '3px',
      },
      boxShadow: {
        DEFAULT: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        none: 'none',
      },
    },
  },
  plugins: [],
};
