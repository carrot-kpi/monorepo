// eslint-disable-next-line @typescript-eslint/no-var-requires
const { theme } = require("./tailwind.preset.theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class", '[class~="dark"]'],
    theme,
    plugins: [require("@tailwindcss/typography")],
};
