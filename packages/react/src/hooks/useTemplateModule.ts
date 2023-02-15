import { IPFSService, Template } from "@carrot-kpi/sdk";
import { TemplateBundle } from "../i18n";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useFederatedModuleContainer } from "./useFederatedModuleContainer";

interface CachedModule {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component: FunctionComponent<any>;
    bundle: TemplateBundle;
}

const MODULE_CACHE: { [entry: string]: CachedModule } = {};

export const useTemplateModule = (
    entryPostfix: string,
    template?: Template,
    customBaseUrl?: string
) => {
    const { baseUrl, entry } = useMemo(() => {
        if (!template) return {};
        return {
            baseUrl:
                customBaseUrl ||
                `${IPFSService.gateway}/ipfs/${template.specification.cid}`,
            entry: `${template.specification.commitHash || ""}${entryPostfix}`,
        };
    }, [template, entryPostfix, customBaseUrl]);
    const { loading: loadingFederatedModule, container } =
        useFederatedModuleContainer(baseUrl, entry);

    const [loadingExport, setLoadingExport] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Component, setComponent] = useState<FunctionComponent<any> | null>(
        null
    );
    const [bundle, setBundle] = useState<TemplateBundle | null>(null);

    useEffect(() => {
        if (entry && MODULE_CACHE[entry]) {
            const { Component, bundle } = MODULE_CACHE[entry];
            setLoadingExport(false);
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
