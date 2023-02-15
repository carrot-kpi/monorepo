/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect } from "react";
import { Template } from "@carrot-kpi/sdk";
import { useTemplateModule } from "../../hooks/useTemplateModule";
import { addBundleForTemplate } from "../../i18n";
import { useState } from "react";
import { i18n } from "i18next";

export type NamespacedTranslateFunction = (key: any, options?: any) => any;

const TRANSLATE_CACHE: { [namespace: string]: NamespacedTranslateFunction } =
    {};

interface TemplateComponentProps {
    type: "creationForm" | "page";
    template?: Template;
    customBaseURL?: string;
    fallback: ReactNode;
    i18n: i18n;
    props?: any;
}

export function TemplateComponent({
    type,
    template,
    customBaseURL,
    fallback,
    i18n,
    props = {},
}: TemplateComponentProps) {
    const { loading, bundle, Component } = useTemplateModule(
        type,
        template,
        customBaseURL
    );

    const [translateWithNamespace, setTranslateWithNamespace] =
        useState<NamespacedTranslateFunction>(
            !!template &&
                TRANSLATE_CACHE[`${template.specification.cid}${type}`]
                ? () => TRANSLATE_CACHE[`${template.specification.cid}${type}`]
                : () => () => ""
        );

    useEffect(() => {
        if (!template || !bundle) return;
        const namespace = `${template.specification.cid}${type}`;
        addBundleForTemplate(i18n, namespace, bundle);
        setTranslateWithNamespace(() => (key: any, options?: any) => {
            return i18n.t(key, { ...options, ns: namespace });
        });
    }, [bundle, template, type, i18n, translateWithNamespace]);

    if (loading || !template || !Component) return <>{fallback}</>;
    return (
        <div id={`carrot-template-${template.specification.commitHash}`}>
            <Component {...props} i18n={i18n} t={translateWithNamespace} />
        </div>
    );
}
