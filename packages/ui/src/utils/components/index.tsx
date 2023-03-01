import React, { FC, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { extendTailwindMerge } from "tailwind-merge";

const twMergeWithConfig = extendTailwindMerge({
    prefix: "cui-",
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
