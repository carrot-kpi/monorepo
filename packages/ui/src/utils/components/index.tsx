import React, { ReactNode } from "react";

export function matchChildByName<T>(child: ReactNode, name: T) {
    return (
        React.isValidElement(child) &&
        (child.type as unknown as () => void).name === name
    );
}
