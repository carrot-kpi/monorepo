import { CarrotUIProvider } from "../src/provider";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "../src/global.css";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

const withCarrotUIProvider = (Story, context) => {
    return (
        <CarrotUIProvider>
            <Story {...context} />
        </CarrotUIProvider>
    );
};

export const decorators = [withCarrotUIProvider];
