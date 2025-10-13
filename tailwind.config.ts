/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: {
        daisyui: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#04214f", // ✅ your custom primary
                    "secondary": "#b3cfe1",
                    "accent": "#3b82f6",
                    "neutral": "#111827",
                    "base-100": "#ffffff",
                },
            },
        ],
    },
};