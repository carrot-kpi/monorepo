import React, { forwardRef, HTMLAttributes, ReactElement } from "react";
import { mergedCva } from "../../../utils/components";
import { Typography } from "../../data-display";
import { BaseInputWrapperProps } from "../commons";

const inputWrapperStyles = mergedCva(["cui-flex", "cui-items-center"], {
    variants: {
        hasLabel: {
            true: ["cui-gap-2"],
        },
    },
});

const radioBackgroundStyles = mergedCva(
    [
        "cui-relative",
        "hover:cui-cursor-pointer",
        "cui-rounded-full",
        "cui-border cui-border-black dark:cui-border-white",
        "cui-h-4",
        "cui-w-4",
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
    checked?: boolean;
    value?: string | number;
    name?: string;
    disabled?: boolean;
    className?: BaseInputWrapperProps["className"] & {
        radioInputWrapper?: string;
    };
}

export type RadioProps = Omit<
    HTMLAttributes<HTMLInputElement>,
    "type" | "className" | keyof BaseRadioProps
> &
    Pick<BaseInputWrapperProps, "label" | "className"> &
    BaseRadioProps;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
    { id, label, className, value, name, disabled, checked, onChange, ...rest },
    ref
): ReactElement {
    return (
        <div
            className={inputWrapperStyles({
                hasLabel: !!label,
                className: className?.inputWrapper,
            })}
        >
            <div
                className={radioBackgroundStyles({
                    checked,
                    className: className?.radioInputWrapper,
                })}
            >
                <input
                    type="radio"
                    ref={ref}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    name={name}
                    onChange={onChange}
                    {...rest}
                    id={id}
                    className={inputStyles({
                        className: className?.input,
                    })}
                />
            </div>
            <Typography className={className?.labelText}>{label}</Typography>
        </div>
    );
});
