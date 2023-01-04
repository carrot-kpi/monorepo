/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: ["./tailwind.preset.js"],
    prefix: "cui-",
    plugins: [require("@tailwindcss/typography")],
    theme: {
        extend: {
            fontSize: {
                xxs: "10px",
            },
        },
    },
};
