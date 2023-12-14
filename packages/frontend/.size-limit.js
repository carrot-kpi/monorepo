const { resolve } = require("node:path");

module.exports = [
    {
        path: resolve("./dist"),
        limit: "4 MB",
    },
];
