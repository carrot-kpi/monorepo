import React, { type FunctionComponent, type ReactElement } from "react";
import { mergedCva } from "../../../../utils/components";

const rootStyles = mergedCva([], {
    variants: {
        active: {
            true: ["cui-rounded-base", "cui-border", "cui-border-gray-400"],
            false: ["cui-border", "cui-border-transparent"],
        },
    },
});

interface MenuItemProps {
    icon: FunctionComponent<React.SVGProps<SVGSVGElement>>;
    title: string;
    action: () => void;
    isActive: () => boolean;
}

export const MenuItem = ({
    icon: Icon,
    title,
    action,
    isActive,
}: MenuItemProps): ReactElement => {
    return (
        <button
            className={rootStyles({ active: isActive() })}
            onClick={action}
            title={title}
        >
            <Icon />
        </button>
    );
};
