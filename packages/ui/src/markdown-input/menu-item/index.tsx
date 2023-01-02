import React, { ReactElement } from "react";

interface MenuItemProps {
    icon: string;
    title: string;
    action: () => void;
    isActive: () => boolean;
}

export const MenuItem = ({
    icon,
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
            <img src={icon} />
        </button>
    );
};
