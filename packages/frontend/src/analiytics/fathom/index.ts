export const initializeFathom = (
    siteId?: string,
    scriptURL = "https://cdn.usefathom.com/script.js"
) => {
    return new Promise<void>((resolve, reject) => {
        if (!siteId) {
            console.warn("could not initilize fathom, site id missing");
            return reject("site id missing");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).fathom) {
            console.warn("fathom is already in window");
            return resolve();
        }

        const script = document.createElement("script");
        script.setAttribute("data-site", siteId);
        script.setAttribute("data-auto", "false");
        script.setAttribute("data-spa", "auto");
        script.onload = () => resolve();
        script.defer = true;
        script.src = scriptURL;
        document.head.appendChild(script);
    });
};
