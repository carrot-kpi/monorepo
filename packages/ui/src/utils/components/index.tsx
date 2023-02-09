import React, { FC, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function matchChildByType<T extends FC<any>>(child: ReactNode, type: T) {
    return React.isValidElement(child) && child.type === type;
}
