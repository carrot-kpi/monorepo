const path = require("path");
module.exports = [
    {
        path: path.join(path.resolve("./"), "./dist/es/**/*.mjs"),
        limit: "65 KB",
    },
    {
        path: path.join(path.resolve("./"), "./dist/cjs/**/*.cjs"),
        limit: "68 KB",
    },
];
