/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: ["./tailwind.preset.js"],
    prefix: "cui-",
    plugins: [require("@tailwindcss/typography")],
    theme: {
        extend: {
            fontSize: {
                xxs: "10px",
                xxl: "15px",
            },
            borderRadius: {
                xxs: "10px",
                xxl: "15px",
            },
        },
    },
};
