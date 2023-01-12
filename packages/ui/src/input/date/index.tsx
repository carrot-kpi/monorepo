import React from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import { inputStyles, LabelWrapper } from "../commons";

export type DateInputProps = BaseInputProps<string>;

export const DateInput = ({
    id,
    label,
    size,
    border,
    className,
    ...rest
}: DateInputProps): ReactElement => {
    return (
        <LabelWrapper id={id} label={label}>
            <input
                id={id}
                type="date"
                {...rest}
                className={inputStyles({ size, border, className })}
            />
        </LabelWrapper>
    );
};
