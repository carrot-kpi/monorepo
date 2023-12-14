const path = require("node:path");

module.exports = [
    {
        path: path.join(__dirname, "dist"),
        limit: "4 MB",
    },
];
