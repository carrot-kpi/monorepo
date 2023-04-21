import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { isCID } from "@carrot-kpi/sdk";

declare const self: ServiceWorkerGlobalScope;

// TODO: make Workbox and precaching work (as of now all precachable entries are
// excluded in the workbox config using craco)
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

const urlContainsCID = (url: URL): boolean => {
    // handle path-based gateways
    if (url.pathname.startsWith("/ipfs") || url.pathname.startsWith("/ipns"))
        return true;
    const cidFromSubdomain = url.hostname.split(".")[0];
    return isCID(cidFromSubdomain);
};

const IPFS_CACHE_NAME = "ipfs-cache";

registerRoute(
    ({ url }) => !!urlContainsCID(url),
    new CacheFirst({
        cacheName: IPFS_CACHE_NAME,
    })
);
