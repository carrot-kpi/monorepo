/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("@carrot-kpi/ui/tailwind-preset")],
    theme: {
        extend: {
            animation: {
                "marquee-green": "marquee 207s linear infinite",
                "marquee-yellow": "marquee 138s linear infinite",
            },
            backgroundImage: {
                "square-pattern-white-bg":
                    "url('/src/assets/line-pattern-white-bg.svg')",
                "square-pattern": "url('/src/assets/line-pattern.svg')",
                "square-pattern-contrast":
                    "url('/src/assets/line-pattern-contrast.svg')",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
