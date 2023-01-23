import { cva } from "class-variance-authority";
import React from "react";
import { ReactElement } from "react";
import { TextMono } from "../../../text-mono";
import { ReactComponent as RemoveIcon } from "../../../assets/remove-icon.svg";

const tagStyles = cva([
    "cui-rounded-xxl cui-border cui-border-black dark:cui-border-white",
    "cui-px-2 cui-py-1 cui-w-fit cui-bg-white dark:cui-bg-black dark:cui-text-white",
    "cui-flex cui-items-center cui-gap-1 hover:cui-cursor-pointer cui-select-none",
]);

const iconStyles = cva([
    "cui-fill-gray-100 hover:cui-fill-green dark:hover:cui-fill-orange cui-stroke-black",
    "dark:cui-stroke-white dark:cui-fill-black hover:cui-cursor-pointer -cui-mr-1",
]);

export interface TagProps {
    text: string;
    className?: string;
    onRemove: () => void;
}

export const Tag = ({ className, text, onRemove }: TagProps): ReactElement => (
    <div className={tagStyles({ className })}>
        <TextMono size="xs">{text.toUpperCase()}</TextMono>
        <RemoveIcon className={iconStyles()} onClick={onRemove} />
    </div>
);
