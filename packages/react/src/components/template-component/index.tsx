/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
    ReactElement,
    ReactNode,
    useEffect,
    useLayoutEffect,
} from "react";
import { Template } from "@carrot-kpi/sdk";
import { useTemplateModule } from "../../hooks/useTemplateModule";
import { addBundleForTemplate } from "../../i18n";
import { useState } from "react";
import { i18n } from "i18next";
import { cva } from "class-variance-authority";
import { useTheme } from "../../hooks";
import { useMedia } from "react-use";
import { ErrorBoundary } from "../error-boundary";

const wrapperStyles = cva(["h-full"], {
    variants: {
        dark: {
            true: ["dark"],
        },
    },
});

export type NamespacedTranslateFunction = (key: any, options?: any) => any;

const TRANSLATE_CACHE: { [namespace: string]: NamespacedTranslateFunction } =
    {};

export interface TemplateComponentProps {
    entity: "kpiToken" | "oracle";
    type: "creationForm" | "page";
    template?: Template;
    fallback: ReactNode;
    error: ReactElement;
    i18n: i18n;
    className?: { root?: string; wrapper?: string };
    additionalProps?: any;
}

export function TemplateComponent({
    entity,
    type,
    template,
    fallback,
    error,
    i18n,
    className,
    additionalProps = {},
}: TemplateComponentProps) {
    const { loading, bundle, Component } = useTemplateModule(
        entity,
        type,
        template
    );
    const theme = useTheme();
    const systemDarkTheme = useMedia("(prefers-color-scheme: dark)");

    const [dark, setDark] = useState(false);
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
        if (TRANSLATE_CACHE[namespace]) {
            setTranslateWithNamespace(() => TRANSLATE_CACHE[namespace]);
            return;
        }
        addBundleForTemplate(i18n, namespace, bundle);
        const namespacedTranslate = (key: any, options?: any) => {
            return i18n.t(key, { ...options, ns: namespace });
        };
        TRANSLATE_CACHE[namespace] = namespacedTranslate;
        setTranslateWithNamespace(() => namespacedTranslate);
    }, [bundle, template, type, i18n]);

    useLayoutEffect(() => {
        setDark(
            theme === "dark"
                ? true
                : theme === "light"
                ? false
                : systemDarkTheme
        );
    }, [systemDarkTheme, theme]);

    if (loading || !template || !Component) return <>{fallback}</>;
    return (
        <div
            id={`carrot-template-${template.specification.commitHash}`}
            className={className?.root}
        >
            <div
                className={wrapperStyles({
                    dark,
                    className: className?.wrapper,
                })}
            >
                <ErrorBoundary fallback={error}>
                    <Component
                        {...additionalProps}
                        i18n={i18n}
                        t={translateWithNamespace}
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
}
