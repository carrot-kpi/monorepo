import React from "react";
import { ReactElement } from "react";
import { BaseInputProps, HelperTextWrapper } from "../commons";
import { inputStyles, LabelWrapper } from "../commons";

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
        <LabelWrapper id={id} label={label}>
            <>
                <input
                    id={id}
                    type="date"
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
