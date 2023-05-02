/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useLayoutEffect } from "react";
import { useTemplateModule } from "../../hooks/useTemplateModule";
import { addBundleForTemplate } from "../../i18n";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { useTheme } from "../../hooks";
import { useMedia } from "react-use";
import { ErrorBoundary } from "../error-boundary";
import { BaseTemplateComponentProps } from "../../types";

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

export function TemplateComponent({
    entity,
    type,
    template,
    fallback,
    error,
    i18n,
    className,
    additionalProps = {},
}: BaseTemplateComponentProps) {
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
            className={wrapperStyles({
                dark,
                className: className?.root,
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
    );
}
