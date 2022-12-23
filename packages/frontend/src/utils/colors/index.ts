export const correctColor = (color?: string) =>
    color === "white" ? "black" : "white";

export const isDarkMode = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
