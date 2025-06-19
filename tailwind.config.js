module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue-600
        secondary: '#fbbf24', // Amber-400
        accent: '#10b981', // Emerald-500
        neutral: '#334155', // Slate-700
        base: '#f1f5f9', // Slate-100
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light'],
  },
}; 