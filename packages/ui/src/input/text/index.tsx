import React from "react";
import { ReactElement } from "react";
import { BaseInputProps } from "../commons";
import { inputStyles, LabelWrapper } from "../commons";

export type TextInputProps = BaseInputProps;

export const TextInput = ({
    id,
    label,
    size,
    border,
    className,
    ...rest
}: TextInputProps): ReactElement => {
    return (
        <LabelWrapper id={id} label={label}>
            <input
                id={id}
                type="text"
                {...rest}
                className={inputStyles({ size, border, className })}
            />
        </LabelWrapper>
    );
};
