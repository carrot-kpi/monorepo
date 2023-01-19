import React from "react";
import { ReactElement } from "react";
import { BaseInputProps, HelperTextWrapper } from "../commons";
import { inputStyles, BaseInputWrapper } from "../commons";

export type TextInputProps = BaseInputProps<string>;

export const TextInput = ({
    id,
    label,
    size,
    border,
    helperText,
    error = false,
    className,
    ...rest
}: TextInputProps): ReactElement => {
    return (
        <BaseInputWrapper id={id} label={label}>
            <input
                id={id}
                type="text"
                {...rest}
                className={inputStyles({ error, size, border, className })}
            />
            {helperText && (
                <HelperTextWrapper error={error}>
                    {helperText}
                </HelperTextWrapper>
            )}
        </BaseInputWrapper>
    );
};
