/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

declare let __webpack_share_scopes__: {
    default: any;
};

export interface RemoteContainer {
    __initialized: boolean;
    init: (arg: any) => {
        // eslint
    };
    get: (module: any) => Promise<() => any>;
}

export const useFederatedModuleContainer = (
    baseUrl?: string,
    entry?: string
) => {
    const [loading, setLoading] = useState(false);
    const [container, setContainer] = useState<RemoteContainer | null>(null);

    useEffect(() => {
        if (!entry || !baseUrl) return;
        let cancelled = false;
        const fetchContainer = async () => {
            setLoading(true);
            try {
                await __webpack_init_sharing__("default");
                if (!__webpack_share_scopes__.default) {
                    console.warn("webpack share scope is undefined");
                    return;
                }
                const sanitizedUrl = baseUrl.endsWith("/")
                    ? `${baseUrl}remoteEntry.js`
                    : `${baseUrl}/remoteEntry.js`;
                let scriptTag = document.querySelector<HTMLScriptElement>(
                    `script[src="${sanitizedUrl}"]`
                );
                if (!!scriptTag) {
                    scriptTag.remove();
                }
                scriptTag = document.createElement("script");
                scriptTag.src = sanitizedUrl;
                scriptTag.async = true;
                scriptTag.onload = async () => {
                    const container = window[entry as keyof Window] as
                        | RemoteContainer
                        | undefined;
                    if (!container) {
                        console.warn(
                            "container still undefined after federated module import"
                        );
                        return;
                    }
                    await container.init(__webpack_share_scopes__.default);
                    if (!cancelled) setContainer(container);
                };
                delete window[entry as keyof Window];
                document.body.appendChild(scriptTag);
            } catch (error) {
                console.error(
                    "could not initialize federated module container",
                    error
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchContainer();
        return () => {
            cancelled = true;
        };
    }, [baseUrl, entry]);

    return { loading, container };
};
