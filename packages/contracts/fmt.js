#!/usr/bin/env node

// if forge fmt is executed from the root of the monorepo the
// paths aren't right. This uses JS' resolve to make it work.

const { resolve } = require("path");
const { execSync } = require("child_process");

let arg = process.argv[2];
if (!arg) {
    console.error("no arg");
    process.exit(1);
}

const format = arg === "format";

execSync(
    `forge fmt ${!format ? "--check" : ""} ${resolve(
        "./src"
    )}/**/*.sol ${resolve("./tests")}/**/*.sol ${resolve("./scripts")}/*.sol`,
    { stdio: "inherit" }
);
