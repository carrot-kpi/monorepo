import { ResolvedTemplate } from "@carrot-kpi/sdk";
import { TemplateBundle } from "../i18n";
import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { useFederatedModuleContainer } from "./useFederatedModuleContainer";
import { State, useSelector } from "@carrot-kpi/shared-state";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { useStagingMode } from "./useStagingMode";
import { useNetwork } from "wagmi";
import { RemoteComponentProps, TemplateEntity, TemplateType } from "../types";

type ComponentType<
    E extends TemplateEntity,
    T extends TemplateType
> = FunctionComponent<RemoteComponentProps<E, T>>;

interface CachedModule<E extends TemplateEntity, T extends TemplateType> {
    Component: ComponentType<E, T>;
    bundle: TemplateBundle;
}

export const useTemplateModule = <
    E extends TemplateEntity,
    T extends TemplateType
>(
    entity: E,
    type: T,
    template?: ResolvedTemplate,
    entry?: string
): {
    loading: boolean;
    Component: ComponentType<E, T> | null;
    bundle: TemplateBundle | null;
} => {
    const MODULE_CACHE = useRef<Record<string, CachedModule<E, T>>>({});

    const customBaseURL = useSelector<
        State,
        | State["preferences"]["kpiTokenTemplateBaseURL"]
        | State["preferences"]["oracleTemplateBaseURL"]
    >((state) =>
        entity === "kpiToken"
            ? state.preferences.kpiTokenTemplateBaseURL
            : state.preferences.oracleTemplateBaseURL
    );
    const { chain } = useNetwork();
    const stagingMode = useStagingMode();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const baseURL = useMemo(() => {
        if (!template || !chain) return undefined;
        let root;
        if (customBaseURL) root = customBaseURL;
        else if (stagingMode && template.specification.stagingURL)
            root = template.specification.stagingURL;
        else root = `${ipfsGatewayURL}/ipfs/${template.specification.cid}`;
        return root.endsWith("/") ? `${root}${type}` : `${root}/${type}`;
    }, [chain, customBaseURL, ipfsGatewayURL, stagingMode, template, type]);
    const { loading: loadingFederatedModule, container } =
        useFederatedModuleContainer(type, baseURL, entry);

    const [loadingExport, setLoadingExport] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Component, setComponent] = useState<ComponentType<E, T> | null>(
        entry && MODULE_CACHE.current[entry]
            ? () => MODULE_CACHE.current[entry].Component
            : null
    );
    const [bundle, setBundle] = useState<TemplateBundle | null>(
        entry && MODULE_CACHE.current[entry]
            ? MODULE_CACHE.current[entry].bundle
            : null
    );

    useEffect(() => {
        if (bundle && Component) return;
        if (entry && MODULE_CACHE.current[entry]) {
            const { Component, bundle } = MODULE_CACHE.current[entry];
            setComponent(() => Component);
            setBundle(bundle);
            return;
        }
        let cancelled = false;
        const fetchExports = async () => {
            if (!container || loadingFederatedModule || !entry) return;
            if (!cancelled) setLoadingExport(true);
            try {
                const componentsFactory = await container.get("./component");
                const { Component } = componentsFactory();
                const i18nFactory = await container.get("./i18n");
                const { bundle } = i18nFactory();
                if (!cancelled) {
                    MODULE_CACHE.current[entry] = {
                        Component,
                        bundle,
                    };
                    setComponent(() => Component);
                    setBundle(bundle);
                }
            } catch (error) {
                console.error(
                    "could not get exported component and bundle",
                    error
                );
            } finally {
                if (!cancelled) setLoadingExport(false);
            }
        };
        fetchExports();
        return () => {
            cancelled = true;
        };
    }, [
        Component,
        MODULE_CACHE,
        bundle,
        container,
        entry,
        loadingFederatedModule,
    ]);

    return {
        loading: loadingFederatedModule || loadingExport,
        Component,
        bundle,
    };
};
