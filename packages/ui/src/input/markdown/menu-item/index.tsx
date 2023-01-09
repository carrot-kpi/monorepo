import React, { FunctionComponent, ReactElement } from "react";

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
            className={`${
                isActive()
                    ? "cui-rounded-md cui-border cui-border-gray-400"
                    : "cui-border cui-border-transparent"
            }`}
            onClick={action}
            title={title}
        >
            <Icon />
        </button>
    );
};
