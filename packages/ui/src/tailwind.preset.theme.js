const SANS_FONT_FAMILY = ["Switzer", "ui-sans-serif", "sans-serif"];
const MONO_FONT_FAMILY = ["IBM Plex Mono", "ui-monospace", "monospace"];

const BODY_TEXT_SIZES_REM = {
    xl: ["1.5rem"],
    lg: ["1.188rem"],
    base: ["1rem"],
    sm: ["0.85rem"],
    xs: ["0.75rem"],
};

const commonHeadingStyle = {
    fontFamily: SANS_FONT_FAMILY,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: "124%",
};

const HEADING_TEXT_SIZES_REM = {
    h1: [
        "3.5rem",
        {
            marginTop: "2rem",
            marginBottom: "1.5rem",
            ...commonHeadingStyle,
        },
    ],
    h2: [
        "2.25rem",
        {
            marginTop: "1.5rem",
            marginBottom: "1rem",
            ...commonHeadingStyle,
        },
    ],
    h3: [
        "1.5rem",
        {
            marginTop: "1rem",
            marginBottom: "0.5rem",
            ...commonHeadingStyle,
        },
    ],
    h4: [
        "1.3125rem",
        {
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            ...commonHeadingStyle,
        },
    ],
};

// this function generates a complete config to be passed to tailwind css's typography plugin config https://tailwindcss.com/docs/typography-plugin
const getTypographyConfig = (variant, theme) => {
    const coreConfig = {};

    const bodyConfig = {
        fontSize: BODY_TEXT_SIZES_REM[variant],
        fontFamily: SANS_FONT_FAMILY,
        lineHeight: "146%",
    };

    coreConfig.h1 = {
        fontSize: HEADING_TEXT_SIZES_REM.h1[0],
        ...HEADING_TEXT_SIZES_REM.h1[1],
    };
    coreConfig.h2 = {
        fontSize: HEADING_TEXT_SIZES_REM.h2[0],
        ...HEADING_TEXT_SIZES_REM.h2[1],
    };
    coreConfig.h3 = {
        fontSize: HEADING_TEXT_SIZES_REM.h3[0],
        ...HEADING_TEXT_SIZES_REM.h3[1],
    };
    coreConfig.h4 = {
        fontSize: HEADING_TEXT_SIZES_REM.h4[0],
        ...HEADING_TEXT_SIZES_REM.h4[1],
    };

    // custom paragraph styles applying default body text attributes
    coreConfig.p = bodyConfig;

    // custom list styles applying default body text attributes
    coreConfig.li = bodyConfig;

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
                lg: getTypographyConfig("lg", theme),
                xl: getTypographyConfig("xl", theme),
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
