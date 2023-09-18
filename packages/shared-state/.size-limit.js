const path = require("path");
module.exports = [
    {
        path: path.join(path.resolve("./"), "./dist/cjs/**/*.cjs"),
        limit: "350 KB",
    },
    {
        path: path.join(path.resolve("./"), "./dist/es/**/*.mjs"),
        limit: "350 KB",
    },
];
