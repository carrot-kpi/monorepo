import { Template } from "@carrot-kpi/sdk";
import { TemplateBundle } from "../i18n";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useFederatedModuleContainer } from "./useFederatedModuleContainer";
import { State, useSelector } from "@carrot-kpi/shared-state";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

interface CachedModule {
    Component: FunctionComponent<unknown>;
    bundle: TemplateBundle;
}

const MODULE_CACHE: { [entry: string]: CachedModule } = {};

export const useTemplateModule = (
    entity: "kpiToken" | "oracle",
    entryPostfix: string,
    template?: Template
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
        return {
            baseUrl:
                customBaseURL ||
                `${ipfsGatewayURL}/ipfs/${template.specification.cid}`,
            entry: `${template.specification.commitHash || ""}${entryPostfix}`,
        };
    }, [customBaseURL, entryPostfix, ipfsGatewayURL, template]);
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
    }, [container, entry, loadingFederatedModule]);

    return {
        loading: loadingFederatedModule || loadingExport,
        Component,
        bundle,
    };
};
