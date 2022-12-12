/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Template } from "@carrot-kpi/sdk";
import { useTemplateModule } from "../../hooks/useTemplateModule";
import {
    addBundleForTemplate,
    CARROT_KPI_REACT_I18N_NAMESPACE,
} from "../../i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type NamespacedTranslateFunction = (key: any, options?: any) => any;

interface TemplateComponentProps {
    type: "creationForm" | "page";
    template?: Template;
    customBaseUrl?: string;
    props?: any;
}

export function TemplateComponent({
    type,
    template,
    customBaseUrl,
    props = {},
}: TemplateComponentProps) {
    const { t } = useTranslation(CARROT_KPI_REACT_I18N_NAMESPACE);
    const { loading, bundle, Component } = useTemplateModule(
        type,
        template,
        customBaseUrl
    );

    const [translateWithNamespace, setTranslateWithNamespace] =
        useState<NamespacedTranslateFunction>(() => () => "");

    useEffect(() => {
        if (loading || !template || !bundle || !Component) return;
        const namespace = `${template.specification.cid}${type}`;
        addBundleForTemplate(namespace, bundle);
        setTranslateWithNamespace(() => (key: any, options?: any) => {
            return t(key, { ...options, ns: namespace });
        });
    }, [Component, bundle, t, loading, template, type]);

    if (loading || !Component) return <>{t("loading")}...</>;
    return <Component {...props} t={translateWithNamespace} />;
}
