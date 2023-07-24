/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("@carrot-kpi/ui/tailwind-preset")],
    theme: {
        extend: {
            animation: {
                "marquee-slow": "marquee 207s linear infinite",
                "marquee-fast": "marquee 138s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
            gridTemplateColumns: {
                "4": "repeat(4, minmax(0, 1fr))",
                "3": "repeat(3, minmax(0, 1fr))",
                "2": "repeat(2, minmax(0, 1fr))",
                "1": "repeat(1, minmax(0, 1fr))",
            },
        },
    },
};
