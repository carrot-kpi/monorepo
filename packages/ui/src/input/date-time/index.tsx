import React from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import { inputStyles, BaseInputWrapper } from "../commons";

export type DateTimeInputProps = BaseInputProps<string>;

export const DateTimeInput = ({
    id,
    label,
    size,
    border,
    error = false,
    helperText,
    className,
    ...rest
}: DateTimeInputProps): ReactElement => {
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
