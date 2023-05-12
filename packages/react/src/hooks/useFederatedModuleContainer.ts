/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { TemplateType } from "../types";

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

declare global {
    interface Window {
        [key: string]: RemoteContainer;
    }
}

export const useFederatedModuleContainer = (
    type: TemplateType,
    baseUrl?: string,
    entry?: string
) => {
    const [loading, setLoading] = useState(false);
    const [container, setContainer] = useState<RemoteContainer | null>(null);

    useEffect(() => {
        if (!entry || !baseUrl) return;
        let cancelled = false;
        let localContainer = window[entry];
        if (!!localContainer && localContainer.__initialized) {
            if (!cancelled) setContainer(localContainer);
            return;
        }
        const fetchContainer = async () => {
            if (!cancelled) setLoading(true);
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
                    scriptTag.type = "application/javascript";
                    scriptTag.async = true;
                    scriptTag.onload = async () => {
                        const tmpContainer = <RemoteContainer | undefined>(
                            window[type]
                        );
                        if (!tmpContainer) {
                            console.warn(
                                "container still undefined after federated module import"
                            );
                            return;
                        }
                        window[entry] = tmpContainer;
                        localContainer = window[entry];
                        try {
                            if (!localContainer.__initialized) {
                                await localContainer.init(shareScope);
                                localContainer.__initialized = true;
                            }
                            if (!cancelled) setContainer(localContainer);
                        } catch (error) {
                            console.error(
                                "could not initialize federated module container",
                                error
                            );
                        }
                    };
                    document.head.appendChild(scriptTag);
                } else {
                    if (!localContainer.__initialized) {
                        await localContainer.init(shareScope);
                        localContainer.__initialized = true;
                    }
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
    }, [baseUrl, entry, type]);

    return { loading, container };
};
