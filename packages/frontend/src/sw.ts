import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { create } from "ipfs-core";
import { isCID } from "@carrot-kpi/sdk";

declare const self: ServiceWorkerGlobalScope;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox inject manifest plugin
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("activate", (event: ExtendableEvent) => {
    const params = new URLSearchParams(location.search);
    const ipfsGateway = params.get("ipfsGateway");
    self.ipfsGateway = ipfsGateway || undefined;
    event.waitUntil(
        new Promise<void>((resolve, reject) => {
            create()
                .then((instance) => {
                    self.ipfs = instance;
                    resolve();
                })
                .catch(reject);
        })
    );
});

const fileToString = async (
    source: AsyncIterable<Uint8Array>
): Promise<string> => {
    const contents: Uint8Array[] = [];
    for await (const chunk of source) contents.push(chunk);
    if (contents.length !== 1) throw new Error("unexpected contents length");
    return new String(contents[0]) as string;
};

const urlToCID = async (url: URL): Promise<string | null> => {
    // handle path-based gateways
    if (url.pathname.startsWith("/ipfs")) {
        return url.pathname;
    }
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

registerRoute(
    ({ request }) => {
        return self.ipfsGateway && request.url.startsWith(self.ipfsGateway);
    },
    {
        handle: async (options): Promise<Response> => {
            const cid = await urlToCID(options.url);
            if (!cid) return await fetch(options.request);
            const stat = await self.ipfs.files.stat(cid);
            if (stat.type === "file")
                return new Response(await fileToString(self.ipfs.cat(cid)));
            return await fetch(options.request);
        },
    }
);
