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
        let localContainer = <RemoteContainer | undefined>(
            window[entry as keyof Window]
        );
        if (!!localContainer && localContainer.__initialized) {
            setContainer(localContainer);
            return;
        }
        const fetchContainer = async () => {
            setLoading(true);
            try {
                const shareScope = __webpack_share_scopes__.default;
                if (!shareScope) {
                    console.warn("webpack share scope is undefined");
                    return;
                }
                if (!localContainer) {
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
                        localContainer = <RemoteContainer | undefined>(
                            window[entry as keyof Window]
                        );
                        if (!localContainer) {
                            console.warn(
                                "container still undefined after federated module import"
                            );
                            return;
                        }
                        try {
                            await localContainer.init(shareScope);
                            localContainer.__initialized = true;
                            if (!cancelled) setContainer(localContainer);
                        } catch (error) {
                            console.error(
                                "could not initialize federated module container",
                                error
                            );
                        }
                    };
                    document.body.appendChild(scriptTag);
                } else {
                    await localContainer.init(shareScope);
                    localContainer.__initialized = true;
                    if (!cancelled) setContainer(localContainer);
                }
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
