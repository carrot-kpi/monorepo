import React, { type FC, type ReactNode } from "react";
import { cva, cx } from "class-variance-authority";
import { extendTailwindMerge } from "tailwind-merge";
import { theme } from "../tailwind-preset-theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const classGroups: { [key: string]: any } = {};
if (theme) {
    if (theme.fontSize)
        classGroups["font-size"] = [{ text: Object.keys(theme.fontSize) }];
}

const twMergeWithConfig = extendTailwindMerge({
    prefix: "cui-",
    extend: {
        classGroups,
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function matchChildByType<T extends FC<any>>(child: ReactNode, type: T) {
    return React.isValidElement(child) && child.type === type;
}

export function mergedCva<T extends object>(
    ...params: Parameters<typeof cva<T>>
): ReturnType<typeof cva<T>> {
    const classList = cva(...params);
    return (...classListParams: Parameters<typeof classList>) => {
        return twMergeWithConfig(classList(...classListParams));
    };
}

export function mergedCx(
    ...params: Parameters<typeof cx>
): ReturnType<typeof cx> {
    const classList = cx(...params);
    return twMergeWithConfig(classList);
}
