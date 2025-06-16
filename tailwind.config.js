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
    themes: [
      {
        mytheme: {
          primary: '#2563eb', // Blue-600
          'primary-content': '#fff',
          secondary: '#fbbf24', // Amber-400
          'secondary-content': '#1e293b',
          accent: '#10b981', // Emerald-500
          'accent-content': '#fff',
          neutral: '#334155', // Slate-700
          'neutral-content': '#f1f5f9',
          'base-100': '#f1f5f9', // Slate-100
          'base-200': '#e2e8f0', // Slate-200
          'base-300': '#cbd5e1', // Slate-300
          'base-content': '#1e293b',
        },
      },
      'light', 'dark', 'cupcake',
    ],
  },
}; 