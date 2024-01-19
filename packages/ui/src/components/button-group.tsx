import React, { forwardRef, useId, type ReactElement } from "react";
import { matchChildByType } from "../utils/components";
import { Button, type ButtonProps } from "./button";
import { cva } from "class-variance-authority";
import { BaseInputWrapper } from "./commons/input";

const rootStyles = cva([
    "cui-w-full",
    "cui-flex",
    "[&>button:last-of-type]:cui-rounded-r-xxl",
    "[&>button:last-of-type]:cui-border-l-0",
    "[&>button:first-of-type]:cui-rounded-l-xxl",
    "[&>button:first-of-type]:cui-border-l",
    "[&>button]:cui-rounded-none",
    "[&>button]:cui-border-l-0",
]);

export interface ButtonGroupProps {
    label?: string;
    children: ReactElement[];
    className?: {
        root?: string;
    };
}

export const ButtonGroup = forwardRef<
    HTMLInputElement,
    ButtonGroupProps & Pick<ButtonProps, "size" | "disabled">
>(function ButtonGroup({ children, label, className, ...rest }) {
    const buttons = children.filter((child) => matchChildByType(child, Button));

    return (
        <BaseInputWrapper id={useId()} label={label} className={className}>
            <div className={rootStyles({ className })}>
                {buttons.map((button, index) =>
                    React.cloneElement<ButtonProps>(button, {
                        key: index,
                        ...rest,
                    }),
                )}
            </div>
        </BaseInputWrapper>
    );
});
