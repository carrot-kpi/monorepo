import React, { ChangeEventHandler } from "react";
import { ReactElement } from "react";
import { BaseInput, BaseInputProps } from "../base";

export type TextInputProps = BaseInputProps<
    string,
    ChangeEventHandler<HTMLInputElement>
>;

export const TextInput = ({
    id,
    size,
    value,
    label,
    placeholder,
    border,
    onChange,
}: TextInputProps): ReactElement => {
    return (
        <BaseInput
            id={id}
            size={size}
            value={value}
            label={label}
            placeholder={placeholder}
            border={border}
            onChange={onChange}
            input={(baseProps) => <input {...baseProps} />}
        />
    );
};
