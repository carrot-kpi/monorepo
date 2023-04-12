const scale = (value, scalingFactor) => value * scalingFactor;

const rem = (value) => `${value}rem`;

const SANS_FONT_FAMILY = ["Inter", "ui-sans-serif", "sans-serif"];
const MONO_FONT_FAMILY = ["IBM Plex Mono", "ui-monospace", "monospace"];

const BODY_TEXT_SIZES_REM = {
    "3xs": 0.5,
    "2xs": 0.6,
    xs: 0.7,
    sm: 0.8,
    base: 1,
    lg: 1.1,
    xl: 1.2,
    "2xl": 1.3,
};

// given the base rem sizes of body text, the reduce operation derives the correct raw
// (js number type) body style to feed into tailwind after performing number to rem unit
// conversion. This is useful to automatically scale values and keep everything consisten
// if we want to change base body text sizes.
const RAW_BODY_TEXT_CONFIG = Object.entries(BODY_TEXT_SIZES_REM).reduce(
    (accumulator, [key, remSize]) => {
        accumulator[key] = [
            remSize,
            {
                lineHeight: scale(remSize, 1.6),
                fontFamily: MONO_FONT_FAMILY,
            },
        ];
        return accumulator;
    },
    {}
);

const HEADING_TEXT_SIZES_REM = {
    h1: 3,
    h2: 2,
    h3: 1.75,
    h4: 1.5,
    h5: 1.25,
    h6: 1,
};

// this reduce operation has the same end goal as the one performed on the body
// text, but with additional styles to be applied to heading texts.
const RAW_HEADING_TEXT_CONFIG = Object.entries(HEADING_TEXT_SIZES_REM).reduce(
    (accumulator, [key, remSize]) => {
        accumulator[key] = [
            remSize,
            {
                lineHeight: scale(remSize, 1.2),
                marginTop: scale(remSize, 0.6),
                marginBottom: scale(remSize, 0.4),
                fontWeight: "700",
                fontFamily: SANS_FONT_FAMILY,
            },
        ];
        return accumulator;
    },
    {}
);

// this function converts numbers in the default raw configs for bofy and heading
// texts to rem units, making the output objet suitable to be passed to
// tailwind css's `fontSize` option.
const getResolvedTextConfig = (rawConfig) =>
    Object.entries(rawConfig).reduce(
        (accumulator, [key, [rawRemSize, additionalStyles]]) => {
            accumulator[key] = [
                rem(rawRemSize),
                Object.entries(additionalStyles).reduce(
                    (accumulator, [key, value]) => {
                        accumulator[key] =
                            typeof value === "number" ? rem(value) : value;
                        return accumulator;
                    },
                    {}
                ),
            ];
            return accumulator;
        },
        {}
    );

// this function generates a complete config to be passed to tailwind css's typography config.
const getTypographyConfig = (variant, scalingFactor, theme) => {
    const coreConfig = {};

    // handle heading text config per-variant basis
    for (const [key, value] of Object.entries(RAW_HEADING_TEXT_CONFIG)) {
        coreConfig[key] = {
            fontSize: rem(value[0]),
            ...Object.entries(value[1]).reduce(
                (accumulator, [attributeName, value]) => {
                    accumulator[attributeName] =
                        typeof value === "number"
                            ? rem(scale(value, scalingFactor))
                            : value;
                    return accumulator;
                },
                {}
            ),
        };
    }

    const bodyConfig = RAW_BODY_TEXT_CONFIG[variant];

    // custom paragraph styles applying default body text attributes
    coreConfig.p = {
        fontSize: rem(bodyConfig[0]),
        marginTop: rem(scale(bodyConfig[0], 1)),
        marginBottom: rem(scale(bodyConfig[0], 1)),
        ...Object.entries(bodyConfig[1]).reduce(
            (accumulator, [attributeName, value]) => {
                accumulator[attributeName] =
                    typeof value === "number"
                        ? rem(scale(value, scalingFactor))
                        : value;
                return accumulator;
            },
            {}
        ),
    };

    // custom list styles applying default body text attributes
    coreConfig.li = {
        fontSize: rem(bodyConfig[0]),
        ...Object.entries(bodyConfig[1]).reduce(
            (accumulator, [attributeName, value]) => {
                accumulator[attributeName] =
                    typeof value === "number"
                        ? rem(scale(value, scalingFactor))
                        : value;
                return accumulator;
            },
            {}
        ),
    };

    // set some colors
    coreConfig["--tw-prose-body"] = theme("colors.black");
    coreConfig["--tw-prose-bullets"] = theme("colors.orange");
    coreConfig["--tw-prose-pre-bg"] = theme("colors.gray[700]");
    coreConfig["--tw-prose-pre-code"] = theme("colors.white");

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
        ...getResolvedTextConfig(RAW_BODY_TEXT_CONFIG),
        ...getResolvedTextConfig(RAW_HEADING_TEXT_CONFIG),
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
                sm: getTypographyConfig("sm", 0.9, theme),
                base: getTypographyConfig("base", 1, theme),
                DEFAULT: getTypographyConfig("base", 1, theme),
                lg: getTypographyConfig("lg", 1.1, theme),
                xl: getTypographyConfig("xl", 1.2, theme),
                "2xl": getTypographyConfig("2xl", 1.3, theme),
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
