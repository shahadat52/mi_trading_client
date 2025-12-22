/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                bangla: ['Hind Siliguri', 'sans-serif'],
                english: ['Inter', 'sans-serif'],
            },
        },
    },

    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#04214f",   // ERP Primary (Header, CTA)
                    secondary: "#b3cfe1", // Soft secondary
                    accent: "#3b82f6",    // Highlight / Action
                    neutral: "#111827",   // Text / Dark UI
                    "base-100": "#ffffff" // Background
                },
            },
        ],
    },
};
