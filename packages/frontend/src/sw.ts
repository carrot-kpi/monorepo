import { precacheAndRoute } from "workbox-precaching";
import { CID } from "multiformats/cid";
import { SERVICE_URLS } from "@carrot-kpi/sdk";

declare const self: ServiceWorkerGlobalScope;

const IPFS_CACHE_NAME = "ipfs-cache";
const CDN_URLS = Object.values(SERVICE_URLS).map((urls) => urls.dataCdn);

// TODO: make Workbox and precaching work (as of now all precachable entries are
// excluded in the workbox config using craco)
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    self.clients
        .matchAll({
            type: "window",
        })
        .then((windowClients) => {
            windowClients.forEach((windowClient) => {
                windowClient.navigate(windowClient.url);
            });
        });
});

const cidFromUrl = (url: URL): CID | null => {
    // handle requests in the format $DATA_CDN_URL/cid/optional-path?whatever
    if (CDN_URLS.includes(url.hostname)) {
        const potentialCid = url.pathname.split("/")[1];
        return CID.asCID(potentialCid);
    }

    // handle path based ipfs gateways
    if (url.pathname.startsWith("/ipfs")) {
        const potentialCid = url.pathname.split("/")[2];
        return CID.asCID(potentialCid);
    }

    // handle subdomain based ipfs gateways
    const potentialCid = url.hostname.split(".")[0];
    return CID.asCID(potentialCid);
};

const handleIpfsDataCall = async (cid: CID, request: Request) => {
    const cacheKey = new TextDecoder().decode(cid.multihash.digest);

    const cachedResponse = await caches.match(cacheKey);
    if (cachedResponse) return cachedResponse;

    const networkResponse = await fetch(request);

    const cacheableResponse = networkResponse.clone();
    const ipfsCache = await caches.open(IPFS_CACHE_NAME);
    ipfsCache.put(cacheKey, cacheableResponse);

    return networkResponse;
};

self.addEventListener("fetch", (event) => {
    const cid = cidFromUrl(new URL(event.request.url));
    if (!cid) return;

    event.respondWith(handleIpfsDataCall(cid, event.request));
});
