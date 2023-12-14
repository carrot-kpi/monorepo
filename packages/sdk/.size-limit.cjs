const path = require("node:path");
module.exports = [
    {
        path: path.join(path.resolve("./"), "./dist/cjs/**/*.cjs"),
        limit: "60 KB",
    },
    {
        path: path.join(path.resolve("./"), "./dist/es/**/*.mjs"),
        limit: "60 KB",
    },
];
