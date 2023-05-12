#!/usr/bin/env node

require("dotenv/config");

const SUPPORTED_BUILD_MODES = ["production", "staging", "library"];

const buildMode = process.argv[2];
if (!buildMode) {
    console.error("A build mode parameter is required");
    process.exit(1);
}
if (SUPPORTED_BUILD_MODES.indexOf(buildMode) < 0) {
    console.error(
        `Unsupported build mode ${buildMode}. Supported values are:\n    ${SUPPORTED_BUILD_MODES.join(
            ", "
        )}`
    );
    process.exit(1);
}

const requireEnv = (envName) => {
    const env = process.env[envName];
    if (!env) throw new Error(`a ${envName} env is required`);
};

console.log(
    `Configuring React app env configuration for build mode "${buildMode}"`
);

requireEnv("REACT_APP_INFURA_PROJECT_ID");

if (buildMode === "production") {
    requireEnv("REACT_APP_WALLETCONNECT_PROJECT_ID");
    requireEnv("REACT_APP_FATHOM_SITE_ID");
} else {
    if (!!process.env.REACT_APP_WALLETCONNECT_PROJECT_ID)
        console.warn("WalletConnect won't be available in the build");
}
