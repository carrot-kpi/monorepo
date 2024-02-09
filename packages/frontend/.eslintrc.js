module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    ignorePatterns: [
        "craco.config.js",
        "tailwind.config.js",
        "synpress.config.js",
        "src/out",
    ],
    extends: [
        "custom",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    plugins: ["react"],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        "space-before-function-paren": "off",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
        "react-hooks/exhaustive-deps": "error",
    },
};
