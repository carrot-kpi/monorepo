import React from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
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
                {...rest}
                className={inputStyles({
                    error,
                    size,
                    border,
                    className: className?.input,
                })}
            />
        </BaseInputWrapper>
    );
};
