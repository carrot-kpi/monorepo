import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { isCID } from "@carrot-kpi/sdk";

declare const self: ServiceWorkerGlobalScope;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox inject manifest plugin
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => {
    self.skipWaiting();
    self.clients.claim();
});

const urlToCID = (url: URL): string | null => {
    // handle path-based gateways
    if (url.pathname.startsWith("/ipfs") || url.pathname.startsWith("/ipns"))
        return url.pathname;
    const cidFromSubdomain = url.hostname.split(".")[0];
    if (isCID(cidFromSubdomain)) {
        const withPrefix = `/ipfs/${cidFromSubdomain}`;
        const joined = withPrefix.endsWith("/")
            ? `${withPrefix}${url.pathname}`
            : `${withPrefix}/${url.pathname}`;
        return joined.startsWith("/") ? joined : `/${joined}`;
    }
    return null;
};

const IPFS_CACHE_NAME = "ipfs-cache";

registerRoute(({ url }) => !!urlToCID(url), {
    handle: async (options): Promise<Response> => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const cid = urlToCID(options.url)!;
        let response = await caches.match(cid);
        if (!!response) return response;
        response = await fetch(options.request);
        // don't cache the response if bad
        if (!response.ok) return response;
        const cache = await caches.open(IPFS_CACHE_NAME); //create dynamic cache
        cache.put(cid, response.clone());
        return response;
    },
});
