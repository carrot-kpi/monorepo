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
            error = false,
            className,
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
                className={className}
            >
                <input
                    id={id}
                    type="text"
                    ref={ref}
                    {...rest}
                    className={inputStyles({
                        error,
                        variant,
                        border,
                        className: className?.input,
                    })}
                />
            </BaseInputWrapper>
        );
    }
);
