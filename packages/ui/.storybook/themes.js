import { create } from "@storybook/theming";

const createCustomThemeVariant = (base) => {
    return create({
        base,
        brandTitle: "Carrot UI",
        brandUrl: "https://carrot.eth.limo",
        brandImage: "/brand-image.svg",
        brandTarget: "_self",
        colorPrimary: "#EF692B",
        colorSecondary: "#D6602A",
    });
};

export const light = createCustomThemeVariant("light");
export const dark = createCustomThemeVariant("dark");
