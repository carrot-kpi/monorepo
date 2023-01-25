import React from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import { inputStyles, BaseInputWrapper } from "../commons";

export type DateInputProps = BaseInputProps<string>;

export const DateInput = ({
    id,
    label,
    size,
    border,
    helperText,
    error = false,
    className,
    ...rest
}: DateInputProps): ReactElement => {
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
