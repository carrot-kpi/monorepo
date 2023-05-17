exports.getEnv = (name, required) => {
    const value = process.env[name];
    if (required && !value) throw new Error(`env ${name} is required`);
    return JSON.stringify(value || "");
};
