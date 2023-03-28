import { ResolvedTemplate } from "@carrot-kpi/sdk";
import { TemplateBundle } from "../i18n";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useFederatedModuleContainer } from "./useFederatedModuleContainer";
import { State, useSelector } from "@carrot-kpi/shared-state";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

interface CachedModule {
    Component: FunctionComponent<unknown>;
    bundle: TemplateBundle;
}

const MODULE_CACHE: Record<string, CachedModule> = {};

export const useTemplateModule = (
    entity: "kpiToken" | "oracle",
    type: "creationForm" | "page",
    template?: ResolvedTemplate
) => {
    const customBaseURL = useSelector<
        State,
        | State["preferences"]["kpiTokenTemplateBaseURL"]
        | State["preferences"]["oracleTemplateBaseURL"]
    >((state) =>
        entity === "kpiToken"
            ? state.preferences.kpiTokenTemplateBaseURL
            : state.preferences.oracleTemplateBaseURL
    );
    const ipfsGatewayURL = useIPFSGatewayURL();

    const { baseUrl, entry } = useMemo(() => {
        if (!template) return {};
        const root =
            customBaseURL ||
            `${ipfsGatewayURL}/ipfs/${template.specification.cid}`;
        return {
            baseUrl: root.endsWith("/") ? `${root}${type}` : `${root}/${type}`,
            entry: `${template.specification.commitHash}${type}`,
        };
    }, [customBaseURL, ipfsGatewayURL, template, type]);
    const { loading: loadingFederatedModule, container } =
        useFederatedModuleContainer(baseUrl, entry);

    const [loadingExport, setLoadingExport] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Component, setComponent] = useState<FunctionComponent<any> | null>(
        entry && MODULE_CACHE[entry]
            ? () => MODULE_CACHE[entry].Component
            : null
    );
    const [bundle, setBundle] = useState<TemplateBundle | null>(
        entry && MODULE_CACHE[entry] ? MODULE_CACHE[entry].bundle : null
    );

    useEffect(() => {
        if (bundle && Component) return;
        if (entry && MODULE_CACHE[entry]) {
            const { Component, bundle } = MODULE_CACHE[entry];
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
                    MODULE_CACHE[entry] = {
                        Component,
                        bundle,
                    };
                    setComponent(() => Component);
                    setBundle(bundle);
                }
            } finally {
                if (!cancelled) setLoadingExport(false);
            }
        };
        fetchExports();
        return () => {
            cancelled = true;
        };
    }, [Component, bundle, container, entry, loadingFederatedModule]);

    return {
        loading: loadingFederatedModule || loadingExport,
        Component,
        bundle,
    };
};
