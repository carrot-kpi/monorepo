import React, { forwardRef } from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import { inputStyles, BaseInputWrapper } from "../commons";

export type TextInputProps = BaseInputProps<string>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    function TextInput(
        {
            id,
            label,
            variant,
            border,
            helperText,
            icon,
            iconPlacement,
            action,
            actionPlacement,
            error = false,
            className,
            value,
            ...rest
        },
        ref
    ): ReactElement {
        return (
            <BaseInputWrapper
                id={id}
                label={label}
                error={error}
                helperText={helperText}
                icon={icon}
                iconPlacement={iconPlacement}
                action={action}
                actionPlacement={actionPlacement}
                className={className}
            >
                <input
                    id={id}
                    type="text"
                    ref={ref}
                    value={value || ""}
                    {...rest}
                    className={inputStyles({
                        error,
                        variant,
                        border,
                        hasLeftIcon: !!icon && iconPlacement === "left",
                        className: className?.input,
                    })}
                />
            </BaseInputWrapper>
        );
    }
);
