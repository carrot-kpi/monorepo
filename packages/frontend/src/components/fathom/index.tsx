import { initialize as initializeFathom } from "use-fathom-client";
import { registeredEventsResolver } from "../../out/fathom/utilities";

if (!!!__FATHOM_SITE_ID__) console.warn("Fathom tracking is disabled");

export const Fathom = () => {
    if (!!__FATHOM_SITE_ID__)
        initializeFathom(
            __FATHOM_SITE_ID__,
            {
                src: "https://cdn.usefathom.com/script.js",
                "data-auto": false,
                "data-spa": "auto",
            },
            registeredEventsResolver,
        )
            .then(() => {
                console.log("fathom initialized successfully");
            })
            .catch((error) => {
                console.error("could not initialize fathom", error);
            });

    return null;
};
