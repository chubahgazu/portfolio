/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['"Space Grotesk"', 'sans-serif'],
                body: ['Archivo', 'sans-serif'],
                sans: ['Archivo', 'sans-serif'], // Default to Archivo
            },
            colors: {
                'brand': {
                    DEFAULT: '#18181B', // Zinc 900
                    secondary: '#3F3F46', // Zinc 700
                    accent: '#2563EB', // Blue 600
                },
                'bg': {
                    primary: '#FAFAFA', // Zinc 50
                    card: '#FFFFFF',
                },
                'text': {
                    primary: '#09090B', // Zinc 950
                    secondary: '#71717A', // Zinc 500
                }
            },
            boxShadow: {
                'soft': '0 20px 40px -10px rgba(0,0,0,0.05)',
                'input': '0 1px 2px rgba(0,0,0,0.05)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
