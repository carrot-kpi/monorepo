import React, { forwardRef } from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import { inputStyles, BaseInputWrapper } from "../commons";

export type DateInputProps = BaseInputProps<string>;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
    function DateInput(
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
                    type="date"
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
