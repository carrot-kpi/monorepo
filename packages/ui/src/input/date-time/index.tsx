import React from "react";
import { ReactElement } from "react";
import { BaseInputProps, HelperTextWrapper } from "../commons";
import { inputStyles, LabelWrapper } from "../commons";

export type DateTimeInputProps = BaseInputProps<string>;

export const DateTimeInput = ({
    id,
    label,
    size,
    border,
    helperText,
    error = false,
    className,
    ...rest
}: DateTimeInputProps): ReactElement => {
    return (
        <LabelWrapper id={id} label={label}>
            <>
                <input
                    id={id}
                    type="datetime-local"
                    {...rest}
                    className={inputStyles({ error, size, border, className })}
                />
                {helperText && (
                    <HelperTextWrapper error={error}>
                        {helperText}
                    </HelperTextWrapper>
                )}
            </>
        </LabelWrapper>
    );
};
