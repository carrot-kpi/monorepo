const path = require("node:path");

module.exports = [
    {
        path: path.join(__dirname, "./dist/es/**/*.mjs"),
        limit: "80 KB",
    },
    {
        path: path.join(__dirname, "./dist/cjs/**/*.cjs"),
        limit: "80 KB",
    },
];
