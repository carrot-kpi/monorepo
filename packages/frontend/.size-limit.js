const path = require("node:path");

console.log({ __dirname });

module.exports = [
    {
        path: path.join(__dirname, "dist"),
        limit: "4 MB",
    },
];
