/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useLayoutEffect } from "react";
import { useTemplateModule } from "../../hooks/useTemplateModule";
import { addBundleForTemplate } from "../../i18n";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { useStagingMode, useTheme } from "../../hooks";
import { useMedia } from "react-use";
import { ErrorBoundary } from "../error-boundary";
import type { BaseTemplateComponentProps } from "../../types";
import { useNetwork } from "wagmi";

const wrapperStyles = cva(["w-full", "h-full"], {
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
    const { chain } = useNetwork();
    const stagingMode = useStagingMode();

    const entry =
        chain && template
            ? `${chain.id}-${template.id}-${template.version}-${template.address}-${type}-staging-${stagingMode}`
            : undefined;

    const { loading, bundle, Component } = useTemplateModule(
        entity,
        type,
        template,
        entry,
    );
    const theme = useTheme();
    const systemDarkTheme = useMedia("(prefers-color-scheme: dark)");

    const [dark, setDark] = useState(false);
    const [translateWithNamespace, setTranslateWithNamespace] =
        useState<NamespacedTranslateFunction>(
            !!template && !!entry && TRANSLATE_CACHE[entry]
                ? () => TRANSLATE_CACHE[entry]
                : () => () => "",
        );

    useEffect(() => {
        if (!template || !bundle || !entry) return;
        if (TRANSLATE_CACHE[entry]) {
            setTranslateWithNamespace(() => TRANSLATE_CACHE[entry]);
            return;
        }
        addBundleForTemplate(i18n, entry, bundle);
        const namespacedTranslate = (key: any, options?: any) => {
            return i18n.t(key, { ...options, ns: entry });
        };
        TRANSLATE_CACHE[entry] = namespacedTranslate;
        setTranslateWithNamespace(() => namespacedTranslate);
    }, [bundle, template, type, i18n, entry]);

    useLayoutEffect(() => {
        setDark(
            theme === "dark"
                ? true
                : theme === "light"
                ? false
                : systemDarkTheme,
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
                    template={template}
                />
            </ErrorBoundary>
        </div>
    );
}
