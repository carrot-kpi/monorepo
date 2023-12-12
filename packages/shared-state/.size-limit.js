const path = require("path");

module.exports = [
    {
        path: path.join(__dirname, "./dist/cjs/**/*.cjs"),
        limit: "350 KB",
    },
    {
        path: path.join(__dirname, "./dist/es/**/*.mjs"),
        limit: "350 KB",
    },
];
