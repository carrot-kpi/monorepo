/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: [
                "Helvetica",
                "ui-sans-serif",
                "system-ui",
                "Arial",
                "sans-serif",
            ],
            mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular"],
        },
        colors: {
            // primary
            "carrot-orange": "#EF692B",
            "carrot-green": "#6CFF95",
            // secondary
            "orange-dark": "#D6602A",
            "green-dark": "#359650",
            yellow: "#F6FB18",
            "sky-blue": "#22BDD5",
            blue: "#0029FF",
            magenta: "#CF2CF6",
            pink: "#EA33A8",
            red: "#EA392A",
            // neutrals
            transparent: "transparent",
            current: "currentColor",
            white: "#ffffff",
            black: "#000000",
            "gray-700": "#272727",
            "gray-600": "#616161",
            "gray-500": "#828282",
            "gray-400": "#B3B3B3",
            "gray-300": "#CBCBCB",
            "gray-200": "#E9E9E9",
            "gray-100": "#F6F6F6",
        },
        extend: {
            fontSize: {
                "2xs": "10px",
            },
            backgroundImage: {
                "square-pattern-white-bg":
                    "url('/src/assets/line-pattern-white-bg.svg')",
                "square-pattern": "url('/src/assets/line-pattern.svg')",
                "square-pattern-contrast":
                    "url('/src/assets/line-pattern-contrast.svg')",
            },
            backgroundSize: {
                4: "4rem",
                2: "2rem",
            },
        },
    },
    plugins: [],
};
