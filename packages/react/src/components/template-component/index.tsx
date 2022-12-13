/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { Template } from "@carrot-kpi/sdk";
import { useTemplateModule } from "../../hooks/useTemplateModule";
import { addBundleForTemplate } from "../../i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type NamespacedTranslateFunction = (key: any, options?: any) => any;

interface TemplateComponentProps {
    type: "creationForm" | "page";
    template?: Template;
    customBaseUrl?: string;
    fallback: ReactNode;
    props?: any;
}

export function TemplateComponent({
    type,
    template,
    customBaseUrl,
    fallback,
    props = {},
}: TemplateComponentProps) {
    const { t, i18n } = useTranslation();
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
        addBundleForTemplate(i18n, namespace, bundle);
        setTranslateWithNamespace(() => (key: any, options?: any) => {
            return t(key, { ...options, ns: namespace });
        });
    }, [Component, bundle, t, loading, template, type]);

    if (loading || !Component) return <>{fallback}</>;
    return <Component {...props} t={translateWithNamespace} />;
}
