const { join } = require("node:path");

module.exports = [
    {
        path: join(__dirname, "dist"),
        limit: "4 MB",
    },
];
