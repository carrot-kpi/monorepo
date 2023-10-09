const path = require("path");
module.exports = [
    {
        path: path.join(path.resolve("./"), "./dist/es/**/*.mjs"),
        limit: "750 KB",
    },
    {
        path: path.join(path.resolve("./"), "./dist/cjs/**/*.cjs"),
        limit: "750 KB",
    },
    {
        path:path.join(path.resolve("./"), "./dist/styles.css"),
        limit: "10 KB",
    },
];
