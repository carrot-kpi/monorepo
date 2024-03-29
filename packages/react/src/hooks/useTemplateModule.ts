import { DATA_CDN_URL, ResolvedTemplate } from "@carrot-kpi/sdk";
import type { TemplateBundle } from "../i18n";
import {
    type FunctionComponent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useFederatedModuleContainer } from "./useFederatedModuleContainer";
import { type State, useSelector, Environment } from "@carrot-kpi/shared-state";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import type {
    RemoteComponentProps,
    SerializableObject,
    TemplateEntity,
    TemplateType,
} from "../types/templates";
import { useTemplatePreviewMode } from "./useTemplatePreviewMode";
import { useEnvironment } from "./useEnvironment";
import { usePreferDecentralization } from "./usePreferDecentralization";

type ComponentType<
    E extends TemplateEntity,
    T extends TemplateType,
    S extends SerializableObject<S>,
> = FunctionComponent<RemoteComponentProps<E, T, S>>;

interface CachedModule<
    E extends TemplateEntity,
    T extends TemplateType,
    S extends SerializableObject<S>,
> {
    Component: ComponentType<E, T, S>;
    bundle: TemplateBundle;
}

interface TemplateModuleParams<E, T> {
    entity: E;
    type: T;
    template?: ResolvedTemplate;
    entry?: string;
}

export const useTemplateModule = <
    E extends TemplateEntity,
    T extends TemplateType,
    S extends SerializableObject<S>,
>(
    params: TemplateModuleParams<E, T>,
): {
    loading: boolean;
    Component: ComponentType<E, T, S> | null;
    bundle: TemplateBundle | null;
} => {
    const { entity, type, entry, template } = params;
    const MODULE_CACHE = useRef<Record<string, CachedModule<E, T, S>>>({});

    const customBaseURL = useSelector<
        State,
        | State["preferences"]["kpiTokenTemplateBaseURL"]
        | State["preferences"]["oracleTemplateBaseURL"]
    >((state) =>
        entity === "kpiToken"
            ? state.preferences.kpiTokenTemplateBaseURL
            : state.preferences.oracleTemplateBaseURL,
    );
    const environment = useEnvironment();
    const templatePreviewMode = useTemplatePreviewMode();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();

    const baseURL = useMemo(() => {
        if (!template) return undefined;
        let root: string;
        if (customBaseURL) root = customBaseURL;
        else if (
            environment !== Environment.Local &&
            environment !== Environment.Production &&
            templatePreviewMode &&
            template.specification.previewUrl?.[environment]
        )
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            root = template.specification.previewUrl[environment]!;
        else if (
            environment === Environment.Local &&
            templatePreviewMode &&
            template.specification.previewUrl?.[Environment.Development]
        )
            root = template.specification.previewUrl[Environment.Development];
        else
            root = preferDecentralization
                ? `${ipfsGatewayURL}/ipfs/${template.specification.cid}`
                : `${DATA_CDN_URL}/${template.specification.cid}`;
        return root.endsWith("/") ? `${root}${type}` : `${root}/${type}`;
    }, [
        template,
        customBaseURL,
        environment,
        templatePreviewMode,
        preferDecentralization,
        ipfsGatewayURL,
        type,
    ]);
    const { loading: loadingFederatedModule, container } =
        useFederatedModuleContainer({ type, baseUrl: baseURL, entry });

    const [loadingExport, setLoadingExport] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Component, setComponent] = useState<ComponentType<E, T, S> | null>(
        entry && MODULE_CACHE.current[entry]
            ? () => MODULE_CACHE.current[entry].Component
            : null,
    );
    const [bundle, setBundle] = useState<TemplateBundle | null>(
        entry && MODULE_CACHE.current[entry]
            ? MODULE_CACHE.current[entry].bundle
            : null,
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
                    error,
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
