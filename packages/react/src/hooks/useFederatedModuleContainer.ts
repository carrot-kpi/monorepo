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
        let cancelled = false;
        const fetchContainer = async () => {
            if (!entry || !baseUrl) return;
            let container = <RemoteContainer | undefined>(
                window[entry as keyof Window]
            );
            if (!!container && container.__initialized) {
                setContainer(container);
                return;
            }
            if (!cancelled) setLoading(true);
            try {
                const sanitizedBaseUrl = baseUrl.endsWith("/")
                    ? baseUrl
                    : `${baseUrl}/`;
                if (!container)
                    await import(
                        /* webpackIgnore: true */ `${sanitizedBaseUrl}${entry}.js`
                    );
                container = <RemoteContainer | undefined>(
                    window[entry as keyof Window]
                );
                if (!container) {
                    console.warn(
                        "container still undefined after federated module import"
                    );
                    return;
                }
                const shareScope = __webpack_share_scopes__.default;
                if (!shareScope) {
                    console.warn("webpack share scope is undefined");
                    return;
                }
                await container.init(shareScope);
                const setPublicPathModuleFactory = await container.get(
                    "./set-public-path"
                );
                const { set: setModulePublicPath } =
                    setPublicPathModuleFactory();
                setModulePublicPath(sanitizedBaseUrl);
                container.__initialized = true;
                if (!cancelled) setContainer(container);
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
