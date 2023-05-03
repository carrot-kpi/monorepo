#!/usr/bin/env node

require("dotenv/config");

const requireEnv = (envName) => {
    const env = process.env[envName];
    if (!env) throw new Error(`a ${envName} env is required`);
};

requireEnv("REACT_APP_INFURA_PROJECT_ID");
requireEnv("REACT_APP_WALLETCONNECT_PROJECT_ID");

console.log("env is ok");
