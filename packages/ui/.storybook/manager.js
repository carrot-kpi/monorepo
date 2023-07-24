import { create } from "@storybook/theming";
import { addons } from "@storybook/manager-api";

const createCustomThemeVariant = (base) => {
    return create({
        base,
        brandTitle: "Carrot UI",
        brandUrl: "https://carrot.eth.limo",
        brandImage: "/brand-image.svg",
        brandTarget: "_self",
        colorPrimary: "#EF692B",
        colorSecondary: "#D6602A",
        appBg: "black",
    });
};

addons.setConfig({
    theme: createCustomThemeVariant("light"),
});

addons.setConfig({
    theme: createCustomThemeVariant("dark"),
});
