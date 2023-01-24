import React from "react";
import { ReactElement } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { BaseInputProps, inputStyles, BaseInputWrapper } from "../commons";

export type NumberInputProps = Omit<NumericFormatProps, "size"> &
    BaseInputProps<string>;

export const NumberInput = ({
    id,
    size,
    value,
    label,
    placeholder,
    border,
    helperText,
    error = false,
    className,
    ...rest
}: NumberInputProps): ReactElement => {
    return (
        <BaseInputWrapper
            id={id}
            label={label}
            error={error}
            helperText={helperText}
        >
            <NumericFormat
                type="text"
                defaultValue=""
                thousandSeparator=","
                decimalSeparator="."
                value={value}
                placeholder={placeholder}
                {...rest}
                className={inputStyles({ error, size, border, className })}
            />
        </BaseInputWrapper>
    );
};
