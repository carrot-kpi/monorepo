const BODY_TEXT_CONFIG = {
    "3xs": [
        "0.52rem",
        {
            lineHeight: "0.78rem",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
        },
    ],
    "2xs": [
        "0.625rem",
        {
            lineHeight: "0.9375rem",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
        },
    ],
    xs: [
        "0.75rem",
        {
            lineHeight: "1.125rem",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
        },
    ],
    sm: [
        "0.875rem",
        {
            lineHeight: "1.311rem",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
        },
    ],
    base: [
        "1rem",
        { lineHeight: "1.5rem", marginTop: "0.75rem", marginBottom: "0.75rem" },
    ],
    lg: [
        "1.1875rem",
        {
            lineHeight: "1.78125rem",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
        },
    ],
    xl: [
        "1.375rem",
        {
            lineHeight: "2.0625rem",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
        },
    ],
    "2xl": [
        "1.5rem",
        {
            lineHeight: "2.25rem",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
        },
    ],
};

const HEADING_TEXT_CONFIG = {
    h1: [
        "3.5rem",
        {
            lineHeight: "3.535rem",
            marginBottom: "2rem",
            marginTop: "3.5rem",
        },
    ],
    h2: [
        "3rem",
        { lineHeight: "3.03rem", marginBottom: "1.5rem", marginTop: "3rem" },
    ],
    h3: [
        "2.5rem",
        { lineHeight: "2.525rem", marginBottom: "1rem", marginTop: "2.5rem" },
    ],
    h4: [
        "1.75rem",
        {
            lineHeight: "1.7675rem",
            marginBottom: "0.7rem",
            marginTop: "2.3rem",
        },
    ],
    h5: [
        "1.5rem",
        { lineHeight: "1.515rem", marginBottom: "0.7rem", marginTop: "2.3rem" },
    ],
    h6: [
        "1.14285714286rem",
        {
            lineHeight: "1.37142857143rem",
            marginBottom: "0.7rem",
            marginTop: "2.3rem",
        },
    ],
};

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
        ...BODY_TEXT_CONFIG,
        ...HEADING_TEXT_CONFIG,
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
        typography({ theme }) {
            return {
                DEFAULT: {
                    css: {
                        maxWidth: "100%",
                        ...Object.entries(HEADING_TEXT_CONFIG).reduce(
                            (accumulator, [key, value]) => {
                                accumulator[key] = {
                                    fontSize: value[0],
                                    lineHeight: value[1].lineHeight,
                                    marginBottom: value[1].marginBottom,
                                    marginTop: value[1].marginTop,
                                    fontFamily: theme("fontFamily")["sans"],
                                };
                                return accumulator;
                            },
                            {}
                        ),
                        p: {
                            fontSize: BODY_TEXT_CONFIG.base[0],
                            lineHeight: BODY_TEXT_CONFIG.base[1].lineHeight,
                            marginBottom: BODY_TEXT_CONFIG.base[1].marginBottom,
                            marginTop: BODY_TEXT_CONFIG.base[1].marginTop,
                            fontFamily: theme("fontFamily")["mono"],
                        },
                        li: {
                            fontSize: BODY_TEXT_CONFIG.base[0],
                            lineHeight: BODY_TEXT_CONFIG.base[1].lineHeight,
                            marginBottom: BODY_TEXT_CONFIG.base[1].marginBottom,
                            marginTop: BODY_TEXT_CONFIG.base[1].marginTop,
                            fontFamily: theme("fontFamily")["mono"],
                        },
                    },
                },
                ...Object.entries(BODY_TEXT_CONFIG).reduce(
                    (accumulator, [key, value]) => {
                        accumulator[key] = {
                            css: {
                                maxWidth: "100%",
                                p: {
                                    fontSize: value[0],
                                    lineHeight: value[1].lineHeight,
                                    marginBottom: value[1].marginBottom,
                                    marginTop: value[1].marginTop,
                                    fontFamily: theme("fontFamily")["mono"],
                                },
                                li: {
                                    fontSize: value[0],
                                    lineHeight: value[1].lineHeight,
                                    marginBottom: value[1].marginBottom,
                                    marginTop: value[1].marginTop,
                                    fontFamily: theme("fontFamily")["mono"],
                                },
                                ...Object.entries(HEADING_TEXT_CONFIG).reduce(
                                    (accumulator, [key, value]) => {
                                        accumulator[key] = {
                                            fontSize: value[0],
                                            lineHeight: value[1].lineHeight,
                                            marginBottom: value[1].marginBottom,
                                            marginTop: value[1].marginTop,
                                            fontFamily:
                                                theme("fontFamily")["sans"],
                                        };
                                        return accumulator;
                                    },
                                    {}
                                ),
                            },
                        };
                        return accumulator;
                    },
                    {}
                ),
            };
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
                "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        },
        gridTemplateColumns: {
            campaigns: "repeat(auto-fit, minmax(320px, 1fr))",
        },
    },
};
