import React, { useCallback } from "react";
import { ReactElement } from "react";
import { Typography, TypographyProps } from "../../../data-display/typography";
import { ReactComponent as RemoveIcon } from "../../../../assets/remove-icon.svg";
import { mergedCva } from "../../../../utils/components";

const tagStyles = mergedCva([
    "cui-rounded-xxl cui-border cui-border-black dark:cui-border-white",
    "cui-px-2 cui-py-1 cui-w-fit cui-bg-white dark:cui-bg-black dark:cui-text-white",
    "cui-flex cui-items-center cui-gap-1 hover:cui-cursor-pointer cui-select-none",
]);

const iconStyles = mergedCva([
    "cui-fill-gray-100 hover:cui-fill-green dark:hover:cui-fill-orange cui-stroke-black",
    "dark:cui-stroke-white dark:cui-fill-black hover:cui-cursor-pointer -cui-mr-1",
]);

export interface TagProps {
    text: string;
    className?: {
        root?: string;
        text?: TypographyProps["className"];
        removeIcon?: string;
    };
    index: number;
    onRemove: (index: number) => void;
}

export const Tag = ({
    className,
    text,
    index,
    onRemove,
}: TagProps): ReactElement => {
    const handleRemove = useCallback(() => {
        onRemove(index);
    }, [index, onRemove]);

    return (
        <div className={tagStyles({ className: className?.root })}>
            <Typography variant="xs" uppercase className={className?.text}>
                {text}
            </Typography>
            <RemoveIcon
                className={iconStyles({ className: className?.removeIcon })}
                onClick={handleRemove}
            />
        </div>
    );
};
