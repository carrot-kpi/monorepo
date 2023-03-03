import React, { forwardRef, HTMLAttributes, ReactElement } from "react";
import { Typography } from "../../data-display";
import { BaseInputWrapper, BaseInputWrapperProps } from "../commons";
import { ReactComponent as Tick } from "../../../assets/tick.svg";
import { mergedCva } from "../../../utils/components";

const inputWrapperStyles = mergedCva(["cui-flex", "cui-items-center"], {
    variants: {
        hasLabel: {
            true: ["cui-gap-2"],
        },
    },
});

const checkmarkBackgroundStyles = mergedCva(
    [
        "cui-relative",
        "cui-w-5",
        "cui-h-5",
        "cui-cursor-pointer",
        "cui-border",
        "cui-rounded-md",
        "cui-border-black",
        "dark:cui-border-white",
        "cui-transition-colors",
    ],
    {
        variants: {
            checked: {
                true: ["cui-bg-orange"],
            },
        },
    }
);

const checkmarkStyles = mergedCva(
    [
        "cui-absolute",
        "cui-top-0",
        "cui-left-0",
        "cui-w-full",
        "cui-h-full",
        "cui-text-black",
        "dark:cui-text-white",
        "cui-transition-opacity",
    ],
    {
        variants: {
            checked: {
                true: ["cui-opacity-100"],
                false: ["cui-opacity-0"],
            },
        },
    }
);

const inputStyles = mergedCva([
    "cui-cursor-pointer",
    "cui-absolute",
    "cui-top-0",
    "cui-left-0",
    "cui-w-full",
    "cui-h-full",
    "cui-opacity-0",
]);

export interface BaseCheckboxProps {
    checked?: boolean;
}

export type CheckboxProps = Omit<
    HTMLAttributes<HTMLInputElement>,
    "type" | "className" | keyof BaseCheckboxProps
> &
    BaseInputWrapperProps &
    BaseCheckboxProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    function Checkbox(
        { id, label, error, helperText, className, checked, ...rest },
        ref
    ): ReactElement {
        return (
            <BaseInputWrapper
                id={id}
                error={error}
                helperText={helperText}
                className={className}
            >
                <div className={inputWrapperStyles({ hasLabel: !!label })}>
                    <div className={checkmarkBackgroundStyles({ checked })}>
                        <Tick className={checkmarkStyles({ checked })} />
                        <input
                            type="checkbox"
                            ref={ref}
                            checked={checked}
                            {...rest}
                            id={id}
                            className={inputStyles({
                                className: className?.input,
                            })}
                        />
                    </div>
                    <Typography className={className?.labelText}>
                        {label}
                    </Typography>
                </div>
            </BaseInputWrapper>
        );
    }
);
