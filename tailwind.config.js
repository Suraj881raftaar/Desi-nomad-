/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // Prevent Tailwind from overwriting our global custom resets
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a251c',
          medium: '#154536',
          light: '#f0f7f4',
        },
        accent: {
          DEFAULT: '#e28743',
          hover: '#c96b2d',
          gold: '#eab308',
        },
        slate: {
          charcoal: '#1e293b',
          muted: '#64748b',
        }
      },
      borderRadius: {
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
