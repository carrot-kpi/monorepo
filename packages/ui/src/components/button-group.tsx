import React, { forwardRef, useId, type ReactElement } from "react";
import { matchChildByType } from "../utils/components";
import { Button, type ButtonProps } from "./button";
import { cva } from "class-variance-authority";
import { BaseInputWrapper } from "./commons/input";

const rootStyles = cva([
    "cui-w-full",
    "cui-flex",
    "cui-flex-col",
    "[&>button]:cui-w-full",
    "[&>button]:cui-rounded-none",
    "[&>button:last-of-type]:cui-rounded-b-xxl",
    "[&>button:last-of-type]:cui-border-t-0",
    "[&>button:first-of-type]:cui-rounded-t-xxl",
    "[&>button:first-of-type]:cui-border-t",
    "[&>button]:cui-border-t-0",
    "md:cui-flex-row",
    "md:cui-w-fit",
    "md:[&>button:last-of-type]:cui-rounded-bl-none",
    "md:[&>button:last-of-type]:cui-rounded-r-xxl",
    "md:[&>button:first-of-type]:cui-rounded-tr-none",
    "md:[&>button:last-of-type]:cui-border-t",
    "md:[&>button:last-of-type]:cui-border-l-0",
    "md:[&>button:first-of-type]:cui-rounded-l-xxl",
    "md:[&>button:first-of-type]:cui-border-l",
    "md:[&>button]:cui-border",
    "md:[&>button]:cui-border-l-0",
    "md:[&>button]:cui-w-fit",
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
        <BaseInputWrapper
            id={useId()}
            label={label}
            className={{ inputWrapper: "cui-w-full md:cui-w-fit" }}
        >
            <div className={rootStyles({ className: className?.root })}>
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
