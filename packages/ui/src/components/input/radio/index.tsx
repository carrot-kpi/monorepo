import React, { forwardRef, HTMLAttributes, ReactElement } from "react";
import { mergedCva } from "../../../utils/components";
import { Typography } from "../../data-display";
import { BaseInputWrapper, BaseInputWrapperProps } from "../commons";

const inputWrapperStyles = mergedCva(["cui-flex", "cui-items-center"], {
    variants: {
        hasLabel: {
            true: ["cui-gap-2"],
        },
    },
});

const radioBackgroundStyles = mergedCva(
    [
        "hover:cui-cursor-pointer",
        "cui-rounded-full",
        "cui-border cui-border-black dark:cui-border-white",
        "cui-h-4",
        "cui-w-4",
    ],
    {
        variants: {
            checked: {
                true: ["cui-bg-orange"],
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

export interface BaseRadioProps {
    value?: string | number;
    name?: string;
    disabled?: boolean;
    checked: boolean;
}

export type RadioProps = Omit<
    HTMLAttributes<HTMLInputElement>,
    "type" | "className" | keyof BaseRadioProps
> &
    BaseInputWrapperProps &
    BaseRadioProps;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
    {
        id,
        label,
        error,
        helperText,
        className,
        value,
        name,
        disabled,
        checked,
        ...rest
    },
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
                <div className={radioBackgroundStyles({ checked })}>
                    <input
                        type="radio"
                        ref={ref}
                        value={value}
                        checked={checked}
                        disabled={disabled}
                        name={name}
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
});
