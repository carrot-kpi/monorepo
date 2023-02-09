import React, { forwardRef } from "react";
import { ReactElement } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { BaseInputProps, inputStyles, BaseInputWrapper } from "../commons";

export type NumberInputProps = Omit<NumericFormatProps, "size" | "className"> &
    BaseInputProps<string>;

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    function NumberInput(
        {
            id,
            variant,
            value,
            label,
            placeholder,
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
                <NumericFormat
                    type="text"
                    defaultValue=""
                    thousandSeparator=","
                    decimalSeparator="."
                    value={value}
                    placeholder={placeholder}
                    getInputRef={ref}
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
