export const initializeFathom = (
    siteId: string,
    scriptURL = "https://cdn.usefathom.com/script.js"
) => {
    return new Promise<void>((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).fathom) {
            console.warn("Fathom is already in window");
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
