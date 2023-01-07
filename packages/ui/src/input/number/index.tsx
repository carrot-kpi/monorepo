import React from "react";
import { ReactElement } from "react";
import {
    NumericFormat,
    NumericFormatProps,
    OnValueChange,
} from "react-number-format";
import { BaseInput, BaseInputProps } from "../base";

type BaseProps = Omit<
    BaseInputProps<OnValueChange, number | string | null>,
    "onChange"
> &
    Omit<NumericFormatProps, "onValueChange" | "size" | "onChange">;

export interface NumberInputProps extends BaseProps {
    onChange: OnValueChange;
}

export const NumberInput = ({
    id,
    size,
    value,
    label,
    placeholder,
    border,
    onChange,
    ...numericFormatProps
}: NumberInputProps): ReactElement => {
    return (
        <BaseInput
            id={id}
            size={size}
            value={value}
            label={label}
            placeholder={placeholder}
            border={border}
            onChange={undefined}
            input={(baseProps) => (
                <NumericFormat
                    {...baseProps}
                    type="text"
                    defaultValue=""
                    thousandSeparator=","
                    decimalSeparator="."
                    {...numericFormatProps}
                    onValueChange={onChange}
                />
            )}
        />
    );
};
