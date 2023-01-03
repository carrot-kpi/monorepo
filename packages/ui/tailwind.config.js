/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: ["./tailwind.preset.js"],
    prefix: "cui-",
    theme: {
        extend: {
            fontSize: {
                "2xs": "10px",
            },
        },
    },
};
