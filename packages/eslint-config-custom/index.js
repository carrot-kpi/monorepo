module.exports = {
    extends: ["turbo", "prettier", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    ignorePatterns: ["node_modules/", "dist/", ".turbo/"],
    rules: {
        "prettier/prettier": "error",
    },
};
