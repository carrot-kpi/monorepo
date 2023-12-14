const { join } = require("node:path");

module.exports = [
    {
        path: join(__dirname, "build"),
        limit: "4 MB",
    },
];
