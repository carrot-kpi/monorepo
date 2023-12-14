const path = require("node:path");

module.exports = [
    {
        path: path.join(__dirname, "./dist/es/**/*.mjs"),
        limit: "750 KB",
    },
    {
        path: path.join(__dirname, "./dist/cjs/**/*.cjs"),
        limit: "750 KB",
    },
    {
        path:path.join(__dirname, "./dist/styles.css"),
        limit: "10 KB",
    },
];
