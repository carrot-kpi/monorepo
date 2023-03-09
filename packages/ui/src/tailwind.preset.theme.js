/** @type {import('tailwindcss').Config} */
exports.theme = {
    fontFamily: {
        sans: ["Inter", "ui-sans-serif", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
    },
    colors: {
        // primary
        orange: "#EF692B",
        green: "#6CFF95",
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
    fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.9375rem" }],
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.875rem", { lineHeight: "1.311rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.1875rem", { lineHeight: "1.78125rem" }],
        xl: ["1.375rem", { lineHeight: "2.0625rem" }],
        "2xl": ["1.5rem", { lineHeight: "2.25rem" }],
        h1: ["4.3125rem", { lineHeight: "4.355625rem" }],
        h2: ["3rem", { lineHeight: "3.03rem" }],
        h3: ["2.5rem", { lineHeight: "2.525rem" }],
        h4: ["1.75rem", { lineHeight: "1.7675rem" }],
        h5: ["1.5rem", { lineHeight: "1.515rem" }],
        h6: ["1.14285714286rem", { lineHeight: "1.37142857143rem" }],
    },
    extend: {
        height({ theme }) {
            const fontSize = theme("fontSize");
            return Object.entries(fontSize).reduce(
                (accumulator, [key, value]) => {
                    accumulator[key] = value[0];
                    return accumulator;
                },
                {}
            );
        },
        borderRadius: {
            xxs: "10px",
            xxl: "15px",
        },
        backgroundSize: {
            4: "4rem 4rem",
            2: "2rem 2rem",
        },
        backgroundImage: {
            "black-squares":
                "linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
            "white-squares":
                "linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        },
        gridTemplateColumns: {
            campaigns: "repeat(auto-fit, minmax(320px, 1fr))",
        },
    },
};
