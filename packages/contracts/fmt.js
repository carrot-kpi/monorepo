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

const srcBasePath = resolve("./src");
const testsBasePath = resolve("./tests");
const scriptsBasePath = resolve("./scripts");

execSync(
    `forge fmt ${
        !format ? "--check" : ""
    } ${srcBasePath}/**/*.sol ${testsBasePath}/**/*.sol ${scriptsBasePath}/*.sol`,
    { stdio: "inherit" }
);
