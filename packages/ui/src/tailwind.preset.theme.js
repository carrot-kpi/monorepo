const SANS_FONT_FAMILY = ["Switzer", "ui-sans-serif", "sans-serif"];
const MONO_FONT_FAMILY = ["IBM Plex Mono", "ui-monospace", "monospace"];

const BODY_TEXT_SIZES_REM = {
    "2xl": "1.5rem",
    xl: "1.188rem",
    base: "1rem",
    sm: "0.85rem",
    xs: "0.75rem",
};

const HEADING_TEXT_SIZES_REM = {
    h1: ["8rem", { letterSpacing: "-0.25rem" }],
    h2: ["6.25rem", { letterSpacing: "-0.15rem" }],
    h3: ["3rem", { letterSpacing: "-0.05rem" }],
    h4: ["1.5rem", { letterSpacing: "0rem" }],
};

const commonHeadingStyle = {
    fontFamily: SANS_FONT_FAMILY,
    fontWeight: 700,
};

// this function generates a complete config to be passed to tailwind css's typography plugin config https://tailwindcss.com/docs/typography-plugin
const getTypographyConfig = (variant, theme) => {
    const coreConfig = {};

    const bodyConfig = {
        fontSize: BODY_TEXT_SIZES_REM[variant],
        fontFamily: SANS_FONT_FAMILY,
    };

    coreConfig.h1 = {
        ...commonHeadingStyle,
        fontSize: "3.5rem",
        letterSpacing: "-0.06rem",
        marginBottom: "1rem",
        marginTop: "1.2rem",
    };
    coreConfig.h2 = {
        ...commonHeadingStyle,
        fontSize: "3rem",
        letterSpacing: "-0.05rem",
        marginBottom: "0.9rem",
        marginTop: "1.1rem",
    };
    coreConfig.h3 = {
        ...commonHeadingStyle,
        fontSize: "2.5rem",
        letterSpacing: "-0.04rem",
        marginBottom: "0.8rem",
        marginTop: "1rem",
    };
    coreConfig.h4 = {
        ...commonHeadingStyle,
        fontSize: "2rem",
        letterSpacing: "-0.03rem",
        marginBottom: "0.7rem",
        marginTop: "0.9rem",
    };

    // custom paragraph styles applying default body text attributes
    coreConfig.p = {
        fontSize: bodyConfig[0],
        fontFamily: SANS_FONT_FAMILY,
    };

    // custom list styles applying default body text attributes
    coreConfig.li = {
        fontSize: bodyConfig[0],
        fontFamily: SANS_FONT_FAMILY,
    };

    // set some colors
    coreConfig["--tw-prose-body"] = theme("colors.black");
    coreConfig["--tw-prose-bullets"] = theme("colors.orange");
    coreConfig["--tw-prose-pre-bg"] = theme("colors.gray[700]");
    coreConfig["--tw-prose-pre-code"] = theme("colors.white");
    coreConfig["--tw-prose-links"] = theme("colors.orange");

    // set max width to 100% to give full control to user
    coreConfig.maxWidth = "100%";

    return { css: coreConfig };
};

/** @type {import('tailwindcss').Config} */
exports.theme = {
    fontFamily: {
        sans: SANS_FONT_FAMILY,
        mono: MONO_FONT_FAMILY,
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
        gray: {
            700: "#272727",
            600: "#616161",
            500: "#828282",
            400: "#B3B3B3",
            300: "#CBCBCB",
            200: "#E9E9E9",
            100: "#F6F6F6",
        },
    },
    fontSize: {
        ...BODY_TEXT_SIZES_REM,
        ...HEADING_TEXT_SIZES_REM,
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
                sm: getTypographyConfig("sm", theme),
                base: getTypographyConfig("base", theme),
                DEFAULT: getTypographyConfig("base", theme),
                xl: getTypographyConfig("xl", theme),
                "2xl": getTypographyConfig("2xl", theme),
            };
        },
        borderRadius: {
            xxs: "10px",
            xxl: "15px",
        },
        backgroundSize: {
            2: "2rem 2rem",
            3: "3rem 3rem",
            4: "4rem 4rem",
        },
        backgroundImage: {
            "black-squares":
                "linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px), " +
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
            "white-squares":
                "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), " +
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        },
        gridTemplateColumns: {
            campaigns: "repeat(auto-fit, minmax(320px, 1fr))",
        },
    },
};
