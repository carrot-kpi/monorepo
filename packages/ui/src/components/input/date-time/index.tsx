import React, { forwardRef } from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import { inputStyles, BaseInputWrapper } from "../commons";

export type DateTimeInputProps = BaseInputProps<string>;

export const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInputProps>(
    function DateTimeInput(
        {
            id,
            label,
            variant,
            border,
            error = false,
            helperText,
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
                    type="datetime-local"
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
