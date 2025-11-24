/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#09090b', // zinc-950
                surface: '#18181b',    // zinc-900
                primary: '#e11d48',    // rose-600
                secondary: '#a855f7',  // purple-500
                text: '#f4f4f5',       // zinc-100
                muted: '#a1a1aa',      // zinc-400
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
