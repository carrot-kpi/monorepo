import React, { ReactNode } from "react";
import { Text } from "../text";

export interface ChipProps {
    children: ReactNode;
}

export const Chip = ({ children }: ChipProps) => (
    <div className="cui-bg-transparent cui-cursor-default cui-p-1 cui-px-2 cui-text-xs cui-rounded-lg cui-border cui-border-black dark:cui-border-white">
        <Text mono>{children}</Text>
    </div>
);
