import React from "react";
import { ReactElement } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import {
    BaseInputProps,
    HelperTextWrapper,
    inputStyles,
    LabelWrapper,
} from "../commons";

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
        <LabelWrapper id={id} label={label}>
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
            {helperText && (
                <HelperTextWrapper error={error}>
                    {helperText}
                </HelperTextWrapper>
            )}
        </LabelWrapper>
    );
};
